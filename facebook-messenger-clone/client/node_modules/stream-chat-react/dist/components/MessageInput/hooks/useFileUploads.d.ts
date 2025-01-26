import type { MessageInputReducerAction, MessageInputState } from './useMessageInputState';
import type { MessageInputProps } from '../MessageInput';
import type { CustomTrigger, DefaultStreamChatGenerics } from '../../../types/types';
export declare const useFileUploads: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics, V extends CustomTrigger = CustomTrigger>(props: MessageInputProps<StreamChatGenerics, V>, state: MessageInputState<StreamChatGenerics>, dispatch: import("react").Dispatch<MessageInputReducerAction<StreamChatGenerics>>) => {
    removeFile: (id: string) => void;
    uploadFile: (id: string) => void;
};
//# sourceMappingURL=useFileUploads.d.ts.map