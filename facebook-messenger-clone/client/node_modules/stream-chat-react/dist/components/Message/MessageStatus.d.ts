import React from 'react';
import { TooltipUsernameMapper } from './utils';
import { AvatarProps } from '../Avatar';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare type MessageStatusProps = {
    Avatar?: React.ComponentType<AvatarProps>;
    messageType?: string;
    tooltipUserNameMapper?: TooltipUsernameMapper;
};
export declare const MessageStatus: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: MessageStatusProps) => JSX.Element | null;
//# sourceMappingURL=MessageStatus.d.ts.map