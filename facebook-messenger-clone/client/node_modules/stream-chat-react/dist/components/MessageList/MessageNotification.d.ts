import React, { PropsWithChildren } from 'react';
export declare type MessageNotificationProps = PropsWithChildren<{
    /** button click event handler */
    onClick: React.MouseEventHandler;
    /** signals whether the message list is considered (below a threshold) to be scrolled to the bottom. Prop used only by [ScrollToBottomButton](https://github.com/GetStream/stream-chat-react/blob/master/src/components/MessageList/ScrollToBottomButton.tsx) */
    isMessageListScrolledToBottom?: boolean;
    /** Whether or not to show notification. Prop used only by [MessageNotification](https://github.com/GetStream/stream-chat-react/blob/master/src/components/MessageList/MessageNotification.tsx)  */
    showNotification?: boolean;
    /** informs the component whether it is rendered inside a thread message list */
    threadList?: boolean;
}>;
export declare const MessageNotification: (props: MessageNotificationProps) => JSX.Element | null;
//# sourceMappingURL=MessageNotification.d.ts.map