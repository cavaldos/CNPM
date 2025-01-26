import React, { PropsWithChildren } from 'react';
import { ChatDownProps } from '../ChatDown/ChatDown';
import type { APIErrorResponse, Channel, ErrorFromResponse } from 'stream-chat';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare type ChannelListMessengerProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    /** Whether or not the channel query request returned an errored response */
    error: ErrorFromResponse<APIErrorResponse> | null;
    /** The channels currently loaded in the list, only defined if `sendChannelsToList` on `ChannelList` is true */
    loadedChannels?: Channel<StreamChatGenerics>[];
    /** Whether or not channels are currently loading */
    loading?: boolean;
    /** Custom UI component to display a loading error, defaults to and accepts same props as: [ChatDown](https://github.com/GetStream/stream-chat-react/blob/master/src/components/ChatDown/ChatDown.tsx) */
    LoadingErrorIndicator?: React.ComponentType<ChatDownProps>;
    /** Custom UI component to display a loading indicator, defaults to and accepts same props as: [LoadingChannels](https://github.com/GetStream/stream-chat-react/blob/master/src/components/Loading/LoadingChannels.tsx) */
    LoadingIndicator?: React.ComponentType;
    /** Local state hook that resets the currently loaded channels */
    setChannels?: React.Dispatch<React.SetStateAction<Channel<StreamChatGenerics>[]>>;
};
/**
 * A preview list of channels, allowing you to select the channel you want to open
 */
export declare const ChannelListMessenger: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: React.PropsWithChildren<ChannelListMessengerProps<StreamChatGenerics>>) => JSX.Element;
//# sourceMappingURL=ChannelListMessenger.d.ts.map