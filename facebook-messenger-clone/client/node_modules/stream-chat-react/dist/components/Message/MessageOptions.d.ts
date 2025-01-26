import React from 'react';
import { MessageContextValue } from '../../context/MessageContext';
import type { DefaultStreamChatGenerics, IconProps } from '../../types/types';
export declare type MessageOptionsProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = Partial<Pick<MessageContextValue<StreamChatGenerics>, 'handleOpenThread'>> & {
    ActionsIcon?: React.ComponentType<IconProps>;
    displayReplies?: boolean;
    messageWrapperRef?: React.RefObject<HTMLDivElement>;
    ReactionIcon?: React.ComponentType<IconProps>;
    theme?: string;
    ThreadIcon?: React.ComponentType<IconProps>;
};
export declare const MessageOptions: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: MessageOptionsProps<StreamChatGenerics>) => JSX.Element | null;
//# sourceMappingURL=MessageOptions.d.ts.map