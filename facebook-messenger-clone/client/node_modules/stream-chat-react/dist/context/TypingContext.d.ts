import React, { PropsWithChildren } from 'react';
import type { ChannelState as StreamChannelState } from 'stream-chat';
import type { DefaultStreamChatGenerics, UnknownType } from '../types/types';
export declare type TypingContextValue<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    typing?: StreamChannelState<StreamChatGenerics>['typing'];
};
export declare const TypingContext: React.Context<TypingContextValue<DefaultStreamChatGenerics> | undefined>;
export declare const TypingProvider: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>({ children, value, }: React.PropsWithChildren<{
    value: TypingContextValue<StreamChatGenerics>;
}>) => JSX.Element;
export declare const useTypingContext: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(componentName?: string) => TypingContextValue<StreamChatGenerics>;
/**
 * Typescript currently does not support partial inference, so if TypingContext
 * typing is desired while using the HOC withTypingContext, the Props for the
 * wrapped component must be provided as the first generic.
 */
export declare const withTypingContext: <P extends UnknownType, StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(Component: React.ComponentType<P>) => {
    (props: Omit<P, "typing">): JSX.Element;
    displayName: string;
};
//# sourceMappingURL=TypingContext.d.ts.map