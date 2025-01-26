import type { MessageProps } from './types';
import type { DefaultStreamChatGenerics } from '../../types/types';
/**
 * The Message component is a context provider which implements all the logic required for rendering
 * an individual message. The actual UI of the message is delegated via the Message prop on Channel.
 */
export declare const Message: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: MessageProps<StreamChatGenerics, import("../../types/types").CustomTrigger>) => JSX.Element;
//# sourceMappingURL=Message.d.ts.map