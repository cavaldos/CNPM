import { ReactionEmoji } from '../../Channel/emojiData';
import type { EmojiContextValue } from '../../../context/EmojiContext';
import type { ReactionsListProps } from '../ReactionsList';
import type { DefaultStreamChatGenerics } from '../../../types/types';
declare type SharedReactionListProps = 'additionalEmojiProps' | 'own_reactions' | 'reaction_counts' | 'reactionOptions' | 'reactions';
declare type UseProcessReactionsParams = Pick<ReactionsListProps, SharedReactionListProps> & Pick<EmojiContextValue, 'emojiConfig'>;
export declare const useProcessReactions: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(params: UseProcessReactionsParams) => {
    additionalEmojiProps: import("../../../context").EmojiSetDef | Partial<import("emoji-mart").NimbleEmojiProps>;
    aggregatedUserNamesByType: Record<string, string[]>;
    emojiData: import("emoji-mart").Data;
    getEmojiByReactionType: (type: string) => ReactionEmoji | undefined;
    iHaveReactedWithReaction: (reactionType: string) => import("stream-chat").ReactionResponse<DefaultStreamChatGenerics> | undefined;
    latestReactions: import("stream-chat").ReactionResponse<DefaultStreamChatGenerics>[];
    latestReactionTypes: string[];
    reactionCounts: {
        [key: string]: number;
    };
    supportedReactionsArePresent: boolean;
    totalReactionCount: number;
};
export {};
//# sourceMappingURL=useProcessReactions.d.ts.map