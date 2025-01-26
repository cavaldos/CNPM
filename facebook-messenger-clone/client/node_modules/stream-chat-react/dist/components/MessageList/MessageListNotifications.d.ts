import React from 'react';
import type { MessageNotificationProps } from './MessageNotification';
import type { ChannelNotifications } from '../../context/ChannelStateContext';
export declare type MessageListNotificationsProps = {
    hasNewMessages: boolean;
    isMessageListScrolledToBottom: boolean;
    isNotAtLatestMessageSet: boolean;
    MessageNotification: React.ComponentType<MessageNotificationProps>;
    notifications: ChannelNotifications;
    scrollToBottom: () => void;
    threadList?: boolean;
};
export declare const MessageListNotifications: (props: MessageListNotificationsProps) => JSX.Element;
//# sourceMappingURL=MessageListNotifications.d.ts.map