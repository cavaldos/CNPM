import React, { RefObject } from 'react';
import { StreamMessage } from '../../../context/ChannelStateContext';
import type { ReactEventHandler } from '../types';
import type { DefaultStreamChatGenerics } from '../../../types/types';
export declare const reactionHandlerWarning = "Reaction handler was called, but it is missing one of its required arguments.\nMake sure the ChannelAction and ChannelState contexts are properly set and the hook is initialized with a valid message.";
export declare const useReactionHandler: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(message?: StreamMessage<StreamChatGenerics> | undefined) => (reactionType: string, event?: React.BaseSyntheticEvent) => Promise<void>;
export declare const useReactionClick: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(message?: StreamMessage<StreamChatGenerics> | undefined, reactionSelectorRef?: RefObject<HTMLDivElement | null>, messageWrapperRef?: RefObject<HTMLDivElement | null>, closeReactionSelectorOnClick?: boolean) => {
    isReactionEnabled: boolean;
    onReactionListClick: ReactEventHandler;
    showDetailedReactions: boolean;
};
//# sourceMappingURL=useReactionHandler.d.ts.map