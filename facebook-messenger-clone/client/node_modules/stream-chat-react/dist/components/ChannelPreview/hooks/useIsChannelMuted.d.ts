import type { Channel } from 'stream-chat';
import type { DefaultStreamChatGenerics } from '../../../types/types';
export declare const useIsChannelMuted: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(channel: Channel<StreamChatGenerics>) => {
    createdAt: Date | null;
    expiresAt: Date | null;
    muted: boolean;
};
//# sourceMappingURL=useIsChannelMuted.d.ts.map