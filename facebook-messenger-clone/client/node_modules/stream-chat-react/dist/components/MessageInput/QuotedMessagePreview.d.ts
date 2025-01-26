import type { StreamMessage } from '../../context/ChannelStateContext';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare const QuotedMessagePreviewHeader: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>() => JSX.Element;
export declare type QuotedMessagePreviewProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    quotedMessage: StreamMessage<StreamChatGenerics>;
};
export declare const QuotedMessagePreview: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>({ quotedMessage, }: QuotedMessagePreviewProps<StreamChatGenerics>) => JSX.Element | null;
//# sourceMappingURL=QuotedMessagePreview.d.ts.map