import type * as grpc from '@grpc/grpc-js';
import type { MethodDefinition } from '@grpc/proto-loader';
import type { ChatRequest as _ai_ChatRequest, ChatRequest__Output as _ai_ChatRequest__Output } from './ChatRequest';
import type { ChatResponse as _ai_ChatResponse, ChatResponse__Output as _ai_ChatResponse__Output } from './ChatResponse';

export interface AIServiceClient extends grpc.Client {
  ChatWithGroq(argument: _ai_ChatRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_ai_ChatResponse__Output>): grpc.ClientUnaryCall;
  ChatWithGroq(argument: _ai_ChatRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_ai_ChatResponse__Output>): grpc.ClientUnaryCall;
  ChatWithGroq(argument: _ai_ChatRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_ai_ChatResponse__Output>): grpc.ClientUnaryCall;
  ChatWithGroq(argument: _ai_ChatRequest, callback: grpc.requestCallback<_ai_ChatResponse__Output>): grpc.ClientUnaryCall;
}

export interface AIServiceHandlers extends grpc.UntypedServiceImplementation {
  ChatWithGroq: grpc.handleUnaryCall<_ai_ChatRequest__Output, _ai_ChatResponse>;
}

export interface AIServiceDefinition extends grpc.ServiceDefinition {
  ChatWithGroq: MethodDefinition<_ai_ChatRequest, _ai_ChatResponse, _ai_ChatRequest__Output, _ai_ChatResponse__Output>
}
