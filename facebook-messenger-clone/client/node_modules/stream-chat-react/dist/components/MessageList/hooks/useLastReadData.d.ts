import type { UserResponse } from 'stream-chat';
import type { StreamMessage } from '../../../context/ChannelStateContext';
import type { DefaultStreamChatGenerics } from '../../../types/types';
declare type UseLastReadDataParams<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    messages: StreamMessage<StreamChatGenerics>[];
    returnAllReadData: boolean;
    userID: string | undefined;
    read?: Record<string, {
        last_read: Date;
        user: UserResponse<StreamChatGenerics>;
    }>;
};
export declare const useLastReadData: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: UseLastReadDataParams<StreamChatGenerics>) => Record<string, UserResponse<StreamChatGenerics>[]>;
export {};
//# sourceMappingURL=useLastReadData.d.ts.map