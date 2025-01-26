import type { StreamMessage } from '../../context/ChannelStateContext';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare type FixedHeightMessageProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    groupedByUser?: boolean;
    message?: StreamMessage<StreamChatGenerics>;
};
/**
 * @deprecated - This UI component will be removed in the next major release.
 *
 * FixedHeightMessage - This component renders a single message.
 * It uses fixed height elements to make sure it works well in VirtualizedMessageList
 */
export declare const FixedHeightMessage: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: FixedHeightMessageProps<StreamChatGenerics>) => JSX.Element;
//# sourceMappingURL=FixedHeightMessage.d.ts.map