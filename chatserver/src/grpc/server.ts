import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { ProtoGrpcType } from '../types/ai';
import { AIServiceHandlers } from '../types/ai/ai/AIService';
import GroqAI from '../utils/groq';

// Load proto file
const PROTO_PATH = path.resolve(__dirname, '../../../proto/ai.proto');

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

// Implement the gRPC service
const aiService: AIServiceHandlers = {
  ChatWithGroq: async (call, callback) => {
    try {
      const { message } = call.request;
      
      if (!message) {
        callback({
          code: grpc.status.INVALID_ARGUMENT,
          message: 'Message is required',
        });
        return;
      }

      const response = await GroqAI(message);
      
      callback(null, {
        success: true,
        message: 'Chat successful',
        response,
      });
    } catch (error) {
      console.error('Error in gRPC ChatWithGroq:', error);
      callback({
        code: grpc.status.INTERNAL,
        message: 'Internal server error',
      });
    }
  },
};

// Create and start gRPC server
export function startGrpcServer(port: number = 50051): grpc.Server {
  const server = new grpc.Server();
  
  server.addService(protoDescriptor.ai.AIService.service, aiService);
  
  server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (err, boundPort) => {
      if (err) {
        console.error('Failed to bind gRPC server:', err);
        return;
      }
      
      console.log(`\n 🚀 ➜ gRPC server running at 0.0.0.0:${boundPort}`);
    }
  );
  
  return server;
}
