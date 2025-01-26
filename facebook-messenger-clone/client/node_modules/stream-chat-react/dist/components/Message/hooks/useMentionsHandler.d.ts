import type React from 'react';
import type { UserResponse } from 'stream-chat';
import type { ReactEventHandler } from '../types';
import type { StreamMessage } from '../../../context/ChannelStateContext';
import type { DefaultStreamChatGenerics } from '../../../types/types';
export declare type CustomMentionHandler<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = (event: React.BaseSyntheticEvent, mentioned_users: UserResponse<StreamChatGenerics>[]) => void;
export declare type MentionedUserEventHandler<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = (event: React.BaseSyntheticEvent, mentionedUsers: UserResponse<StreamChatGenerics>[]) => void;
export declare const useMentionsHandler: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(message?: StreamMessage<StreamChatGenerics> | undefined, customMentionHandler?: {
    onMentionsClick?: CustomMentionHandler<StreamChatGenerics> | undefined;
    onMentionsHover?: CustomMentionHandler<StreamChatGenerics> | undefined;
} | undefined) => {
    onMentionsClick: ReactEventHandler;
    onMentionsHover: ReactEventHandler;
};
//# sourceMappingURL=useMentionsHandler.d.ts.map