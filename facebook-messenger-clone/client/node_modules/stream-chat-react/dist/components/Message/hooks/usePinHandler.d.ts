import { StreamMessage } from '../../../context/ChannelStateContext';
import type { ReactEventHandler } from '../types';
import type { DefaultStreamChatGenerics } from '../../../types/types';
export declare type PinEnabledUserRoles<T extends string = string> = Partial<Record<T, boolean>> & {
    admin?: boolean;
    anonymous?: boolean;
    channel_member?: boolean;
    channel_moderator?: boolean;
    guest?: boolean;
    member?: boolean;
    moderator?: boolean;
    owner?: boolean;
    user?: boolean;
};
export declare type PinPermissions<T extends string = string, U extends string = string> = Partial<Record<T, PinEnabledUserRoles<U>>> & {
    commerce?: PinEnabledUserRoles<U>;
    gaming?: PinEnabledUserRoles<U>;
    livestream?: PinEnabledUserRoles<U>;
    messaging?: PinEnabledUserRoles<U>;
    team?: PinEnabledUserRoles<U>;
};
export declare type PinMessageNotifications<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    getErrorNotification?: (message: StreamMessage<StreamChatGenerics>) => string;
    notify?: (notificationText: string, type: 'success' | 'error') => void;
};
export declare const usePinHandler: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(message: StreamMessage<StreamChatGenerics>, _permissions?: PinPermissions, notifications?: PinMessageNotifications<StreamChatGenerics>) => {
    canPin: boolean;
    handlePin: ReactEventHandler;
};
//# sourceMappingURL=usePinHandler.d.ts.map