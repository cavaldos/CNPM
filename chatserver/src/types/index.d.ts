import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { AIServiceClient as _ai_AIServiceClient, AIServiceDefinition as _ai_AIServiceDefinition } from './ai/AIService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  ai: {
    AIService: SubtypeConstructor<typeof grpc.Client, _ai_AIServiceClient> & { service: _ai_AIServiceDefinition };
    ChatRequest: MessageTypeDefinition;
    ChatResponse: MessageTypeDefinition;
  }
}
