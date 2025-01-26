import type { StreamMessage } from '../../context/ChannelStateContext';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare type GiphyPreviewMessageProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    message: StreamMessage<StreamChatGenerics>;
};
export declare const GiphyPreviewMessage: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: GiphyPreviewMessageProps<StreamChatGenerics>) => JSX.Element;
//# sourceMappingURL=GiphyPreviewMessage.d.ts.map