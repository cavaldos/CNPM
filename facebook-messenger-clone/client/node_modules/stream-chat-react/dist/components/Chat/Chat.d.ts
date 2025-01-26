import React, { PropsWithChildren } from 'react';
import { CustomStyles } from './hooks/useCustomStyles';
import { CustomClasses } from '../../context/ChatContext';
import { SupportedTranslations } from '../../context/TranslationContext';
import type { StreamChat } from 'stream-chat';
import type { Streami18n } from '../../i18n/Streami18n';
import type { DefaultStreamChatGenerics } from '../../types/types';
/**
 * @deprecated will be removed with the complete transition to the theming V2 (next major release - `v11.0.0`)
 */
export declare type Theme<T extends string = string> = 'commerce dark' | 'commerce light' | 'livestream dark' | 'livestream light' | 'messaging dark' | 'messaging light' | 'team dark' | 'team light' | T;
export declare type ChatProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    /** The StreamChat client object */
    client: StreamChat<StreamChatGenerics>;
    /** Object containing custom CSS classnames to override the library's default container CSS */
    customClasses?: CustomClasses;
    /**
     * @desc object containing custom styles to override the default CSS variables
     * @deprecated will be removed with the complete transition to the theming v2 (next major release - `v11.0.0`)
     */
    customStyles?: CustomStyles;
    /**
     * @desc if true, toggles the CSS variables to the default dark mode color palette
     * @deprecated will be removed with the complete transition to the theming v2 (next major release - `v11.0.0`)
     */
    darkMode?: boolean;
    /** Sets the default fallback language for UI component translation, defaults to 'en' for English */
    defaultLanguage?: SupportedTranslations;
    /** Instance of Stream i18n */
    i18nInstance?: Streami18n;
    /** Initial status of mobile navigation */
    initialNavOpen?: boolean;
    /** Used for injecting className/s to the Channel and ChannelList components */
    theme?: string;
    /** Windows 10 does not support country flag emojis out of the box. It chooses to render these emojis as characters instead. Stream
     * Chat can override this behavior by loading a custom web font that will render images instead (PNGs or SVGs depending on the platform).
     * Set this prop to true if you want to use these custom emojis for Windows users.
     */
    useImageFlagEmojisOnWindows?: boolean;
};
/**
 * Wrapper component for a StreamChat application. Chat needs to be placed around any other chat components
 * as it provides the ChatContext.
 */
export declare const Chat: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: React.PropsWithChildren<ChatProps<StreamChatGenerics>>) => JSX.Element | null;
//# sourceMappingURL=Chat.d.ts.map