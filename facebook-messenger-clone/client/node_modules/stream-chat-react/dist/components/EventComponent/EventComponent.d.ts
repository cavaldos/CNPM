import React from 'react';
import { AvatarProps } from '../Avatar';
import type { StreamMessage } from '../../context/ChannelStateContext';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare type EventComponentProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    /** Message object */
    message: StreamMessage<StreamChatGenerics>;
    /** Custom UI component to display user avatar, defaults to and accepts same props as: [Avatar](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Avatar/Avatar.tsx) */
    Avatar?: React.ComponentType<AvatarProps>;
};
export declare const EventComponent: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: EventComponentProps<StreamChatGenerics>) => JSX.Element | null;
//# sourceMappingURL=EventComponent.d.ts.map