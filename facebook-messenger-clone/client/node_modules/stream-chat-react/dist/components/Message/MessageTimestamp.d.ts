import type { StreamMessage } from '../../context/ChannelStateContext';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare const defaultTimestampFormat = "h:mmA";
export declare type MessageTimestampProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    calendar?: boolean;
    customClass?: string;
    format?: string;
    message?: StreamMessage<StreamChatGenerics>;
};
export declare const MessageTimestamp: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: MessageTimestampProps<StreamChatGenerics>) => JSX.Element | null;
//# sourceMappingURL=MessageTimestamp.d.ts.map