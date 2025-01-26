import type { PinIndicatorProps } from './types';
import type { DefaultStreamChatGenerics, IconProps } from '../../types/types';
export declare const ActionsIcon: ({ className }: IconProps) => JSX.Element;
export declare const ReplyIcon: () => JSX.Element;
export declare const DeliveredCheckIcon: () => JSX.Element;
export declare const ReactionIcon: ({ className }: IconProps) => JSX.Element;
export declare const ThreadIcon: ({ className }: IconProps) => JSX.Element;
export declare const ErrorIcon: () => JSX.Element;
export declare const PinIcon: () => JSX.Element;
export declare const PinIndicator: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>({ message, t, }: PinIndicatorProps<StreamChatGenerics>) => JSX.Element | null;
export declare const MessageDeliveredIcon: () => JSX.Element;
export declare const MessageErrorIcon: () => JSX.Element;
//# sourceMappingURL=icons.d.ts.map