import type { ReactEventHandler } from '../types';
import type { StreamMessage } from '../../../context/ChannelStateContext';
import type { DefaultStreamChatGenerics } from '../../../types/types';
export declare type DeleteMessageNotifications<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    getErrorNotification?: (message: StreamMessage<StreamChatGenerics>) => string;
    notify?: (notificationText: string, type: 'success' | 'error') => void;
};
export declare const useDeleteHandler: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(message?: StreamMessage<StreamChatGenerics> | undefined, notifications?: DeleteMessageNotifications<StreamChatGenerics>) => ReactEventHandler;
//# sourceMappingURL=useDeleteHandler.d.ts.map