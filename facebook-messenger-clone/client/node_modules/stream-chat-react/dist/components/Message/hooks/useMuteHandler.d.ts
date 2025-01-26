import { StreamMessage } from '../../../context/ChannelStateContext';
import type { UserResponse } from 'stream-chat';
import type { ReactEventHandler } from '../types';
import type { DefaultStreamChatGenerics } from '../../../types/types';
export declare const missingUseMuteHandlerParamsWarning = "useMuteHandler was called but it is missing one or more necessary parameter.";
export declare type MuteUserNotifications<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    getErrorNotification?: (user: UserResponse<StreamChatGenerics>) => string;
    getSuccessNotification?: (user: UserResponse<StreamChatGenerics>) => string;
    notify?: (notificationText: string, type: 'success' | 'error') => void;
};
export declare const useMuteHandler: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(message?: StreamMessage<StreamChatGenerics> | undefined, notifications?: MuteUserNotifications<StreamChatGenerics>) => ReactEventHandler;
//# sourceMappingURL=useMuteHandler.d.ts.map