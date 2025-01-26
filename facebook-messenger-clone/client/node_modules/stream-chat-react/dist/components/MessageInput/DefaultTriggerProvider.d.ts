import React, { PropsWithChildren } from 'react';
import type { EmojiData } from 'emoji-mart';
import type { SuggestionCommand, SuggestionUser } from '../ChatAutoComplete/ChatAutoComplete';
import type { CommandItemProps } from '../CommandItem/CommandItem';
import type { EmoticonItemProps } from '../EmoticonItem/EmoticonItem';
import type { UserItemProps } from '../UserItem/UserItem';
import type { CustomTrigger, DefaultStreamChatGenerics, UnknownType } from '../../types/types';
export declare type AutocompleteMinimalData = {
    id?: string;
    name?: string;
} & ({
    id: string;
} | {
    name: string;
});
export declare type CommandTriggerSetting<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = TriggerSetting<CommandItemProps, SuggestionCommand<StreamChatGenerics>>;
export declare type EmojiTriggerSetting = TriggerSetting<EmoticonItemProps, EmojiData>;
export declare type UserTriggerSetting<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = TriggerSetting<UserItemProps, SuggestionUser<StreamChatGenerics>>;
export declare type TriggerSetting<T extends UnknownType = UnknownType, U = UnknownType> = {
    component: string | React.ComponentType<T>;
    dataProvider: (query: string, text: string, onReady: (data: (U & AutocompleteMinimalData)[], token: string) => void) => U[] | Promise<void> | void;
    output: (entity: U) => {
        caretPosition: 'start' | 'end' | 'next' | number;
        text: string;
        key?: string;
    } | string | null;
    callback?: (item: U) => void;
};
export declare type TriggerSettings<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics, V extends CustomTrigger = CustomTrigger> = {
    [key in keyof V]: TriggerSetting<V[key]['componentProps'], V[key]['data']>;
} | {
    '/': CommandTriggerSetting<StreamChatGenerics>;
    ':': EmojiTriggerSetting;
    '@': UserTriggerSetting<StreamChatGenerics>;
};
export declare const DefaultTriggerProvider: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics, V extends CustomTrigger = CustomTrigger>({ children, }: PropsWithChildren<Record<string, unknown>>) => JSX.Element;
//# sourceMappingURL=DefaultTriggerProvider.d.ts.map