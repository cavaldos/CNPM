import type { NimbleEmojiProps } from 'emoji-mart';
import type { ReactionResponse } from 'stream-chat';
import type { ReactEventHandler } from '../Message/types';
import type { DefaultStreamChatGenerics } from '../../types/types';
import type { ReactionEmoji } from '../Channel/emojiData';
export declare type ReactionsListProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    /** Additional props to be passed to the [NimbleEmoji](https://github.com/missive/emoji-mart/blob/master/src/components/emoji/nimble-emoji.js) component from `emoji-mart` */
    additionalEmojiProps?: Partial<NimbleEmojiProps>;
    /** Custom on click handler for an individual reaction, defaults to `onReactionListClick` from the `MessageContext` */
    onClick?: ReactEventHandler;
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
    /** Display the reactions in the list in reverse order, defaults to false */
    reverse?: boolean;
};
/**
 * Component that displays a list of reactions on a message.
 */
export declare const ReactionsList: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: ReactionsListProps<StreamChatGenerics>) => JSX.Element | null;
//# sourceMappingURL=ReactionsList.d.ts.map