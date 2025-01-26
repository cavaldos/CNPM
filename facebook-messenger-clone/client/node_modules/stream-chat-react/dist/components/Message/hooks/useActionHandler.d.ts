import { StreamMessage } from '../../../context/ChannelStateContext';
import type React from 'react';
import type { DefaultStreamChatGenerics } from '../../../types/types';
export declare type FormData = Record<string, string>;
export declare type ActionHandlerReturnType = (dataOrName?: string | FormData, value?: string, event?: React.BaseSyntheticEvent) => Promise<void> | void;
export declare const handleActionWarning = "Action handler was called, but it is missing one of its required arguments. \nMake sure the ChannelAction and ChannelState contexts are properly set and the hook is initialized with a valid message.";
export declare function useActionHandler<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(message?: StreamMessage<StreamChatGenerics>): ActionHandlerReturnType;
//# sourceMappingURL=useActionHandler.d.ts.map