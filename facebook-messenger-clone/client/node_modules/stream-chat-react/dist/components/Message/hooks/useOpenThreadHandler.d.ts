import type { ReactEventHandler } from '../types';
import type { StreamMessage } from '../../../context/ChannelStateContext';
import type { DefaultStreamChatGenerics } from '../../../types/types';
export declare const useOpenThreadHandler: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(message?: StreamMessage<StreamChatGenerics> | undefined, customOpenThread?: ((message: StreamMessage<StreamChatGenerics>, event: React.BaseSyntheticEvent) => void) | undefined) => ReactEventHandler;
//# sourceMappingURL=useOpenThreadHandler.d.ts.map