import type { MessageInputReducerAction, MessageInputState } from './useMessageInputState';
import type { EmojiData } from 'emoji-mart';
import type { DefaultStreamChatGenerics } from '../../../types/types';
export declare const useEmojiPicker: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(state: MessageInputState<StreamChatGenerics>, dispatch: import("react").Dispatch<MessageInputReducerAction<StreamChatGenerics>>, insertText: (textToInsert: string) => void, textareaRef: React.MutableRefObject<HTMLTextAreaElement | undefined>, closeEmojiPickerOnClick?: boolean) => {
    closeEmojiPicker: (event: MouseEvent) => void;
    emojiPickerRef: import("react").RefObject<HTMLDivElement>;
    handleEmojiKeyDown: import("react").KeyboardEventHandler<HTMLButtonElement>;
    onSelectEmoji: (emoji: EmojiData) => void;
    openEmojiPicker: import("react").MouseEventHandler<HTMLButtonElement>;
};
//# sourceMappingURL=useEmojiPicker.d.ts.map