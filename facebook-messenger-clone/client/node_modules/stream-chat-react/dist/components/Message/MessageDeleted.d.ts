import type { StreamMessage } from '../../context/ChannelStateContext';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare type MessageDeletedProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    message: StreamMessage<StreamChatGenerics>;
};
export declare const MessageDeleted: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: MessageDeletedProps<StreamChatGenerics>) => JSX.Element;
//# sourceMappingURL=MessageDeleted.d.ts.map