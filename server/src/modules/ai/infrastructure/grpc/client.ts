/**
 * AI Module gRPC Client
 * 
 * This file defines the gRPC client for the AI module to communicate with the chatserver.
 */

import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import dotenv from 'dotenv';
import { ProtoGrpcType } from './types';
import { AIServiceClient } from './types/ai/AIService';

dotenv.config();

// Load proto file
const PROTO_PATH = path.resolve(__dirname, '../../../../../../proto/ai.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(
  packageDefinition
) as unknown as ProtoGrpcType;

// Get gRPC server address from environment variables or use default
const GRPC_SERVER_ADDRESS = process.env.GRPC_SERVER_ADDRESS || 'localhost:50051';

// Create gRPC client
const client = new protoDescriptor.ai.AIService(
  GRPC_SERVER_ADDRESS,
  grpc.credentials.createInsecure()
);

export default client as AIServiceClient;

// Helper function to chat with Groq AI through gRPC
export const chatWithGroq = (message: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    client.ChatWithGroq({ message }, (error: any, response: any) => {
      if (error) {
        console.error('Error calling gRPC service:', error);
        reject(error);
        return;
      }

      if (!response.success) {
        reject(new Error(response.message));
        return;
      }

      resolve(response.response);
    });
  });
};
