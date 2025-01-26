import type { Channel, Event } from 'stream-chat';
import type { DefaultStreamChatGenerics } from '../../../types/types';
export declare const useChannelDeletedListener: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(setChannels: import("react").Dispatch<import("react").SetStateAction<Channel<StreamChatGenerics>[]>>, customHandler?: ((setChannels: import("react").Dispatch<import("react").SetStateAction<Channel<StreamChatGenerics>[]>>, event: Event<StreamChatGenerics>) => void) | undefined) => void;
//# sourceMappingURL=useChannelDeletedListener.d.ts.map