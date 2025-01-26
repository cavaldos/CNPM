import type { ChatContextValue } from '../../../context/ChatContext';
import type { DefaultStreamChatGenerics } from '../../../types/types';
export declare const useChannelContainerClasses: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>({ customClasses, }: Pick<ChatContextValue, 'customClasses'>) => {
    channelClass: string;
    chatClass: string;
    chatContainerClass: string;
    windowsEmojiClass: string;
};
//# sourceMappingURL=useChannelContainerClasses.d.ts.map