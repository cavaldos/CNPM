import React from 'react';
import { AvatarProps } from '../Avatar';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare type ChannelHeaderProps = {
    /** UI component to display a user's avatar, defaults to and accepts same props as: [Avatar](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Avatar/Avatar.tsx) */
    Avatar?: React.ComponentType<AvatarProps>;
    /** Manually set the image to render, defaults to the Channel image */
    image?: string;
    /** Show a little indicator that the Channel is live right now */
    live?: boolean;
    /** UI component to display menu icon, defaults to [MenuIcon](https://github.com/GetStream/stream-chat-react/blob/master/src/components/ChannelHeader/ChannelHeader.tsx)*/
    MenuIcon?: React.ComponentType;
    /** Set title manually */
    title?: string;
};
/**
 * The ChannelHeader component renders some basic information about a Channel.
 */
export declare const ChannelHeader: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: ChannelHeaderProps) => JSX.Element;
//# sourceMappingURL=ChannelHeader.d.ts.map