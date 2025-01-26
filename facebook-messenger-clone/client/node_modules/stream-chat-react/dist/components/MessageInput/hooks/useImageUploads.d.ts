import React from 'react';
import type { MessageInputReducerAction, MessageInputState } from './useMessageInputState';
import type { MessageInputProps } from '../MessageInput';
import type { CustomTrigger, DefaultStreamChatGenerics } from '../../../types/types';
export declare const useImageUploads: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics, V extends CustomTrigger = CustomTrigger>(props: MessageInputProps<StreamChatGenerics, V>, state: MessageInputState<StreamChatGenerics>, dispatch: React.Dispatch<MessageInputReducerAction<StreamChatGenerics>>) => {
    removeImage: (id: string) => void;
    uploadImage: (id: string) => Promise<void>;
};
//# sourceMappingURL=useImageUploads.d.ts.map