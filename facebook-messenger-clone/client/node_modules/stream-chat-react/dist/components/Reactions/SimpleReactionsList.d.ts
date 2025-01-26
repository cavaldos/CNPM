import React from 'react';
import type { NimbleEmojiProps } from 'emoji-mart';
import type { ReactionResponse } from 'stream-chat';
import type { DefaultStreamChatGenerics } from '../../types/types';
import type { ReactionEmoji } from '../Channel/emojiData';
export declare type SimpleReactionsListProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    /** Additional props to be passed to the [NimbleEmoji](https://github.com/missive/emoji-mart/blob/master/src/components/emoji/nimble-emoji.js) component from `emoji-mart` */
    additionalEmojiProps?: Partial<NimbleEmojiProps>;
    /** Function that adds/removes a reaction on a message (overrides the function stored in `MessageContext`) */
    handleReaction?: (reactionType: string, event: React.BaseSyntheticEvent) => Promise<void>;
    /** An array of the own reaction objects to distinguish own reactions visually */
    own_reactions?: ReactionResponse<StreamChatGenerics>[];
    /** An object that keeps track of the count of each type of reaction on a message */
    reaction_counts?: {
        [key: string]: number;
    };
    /** A list of the currently supported reactions on a message */
    reactionOptions?: ReactionEmoji[];
    /** An array of the reaction objects to display in the list */
    reactions?: ReactionResponse<StreamChatGenerics>[];
};
export declare const SimpleReactionsList: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: SimpleReactionsListProps<StreamChatGenerics>) => JSX.Element | null;
//# sourceMappingURL=SimpleReactionsList.d.ts.map