import type { CustomTrigger, DefaultStreamChatGenerics } from '../../types/types';
/**
 * @deprecated This component has beend deprecated in favor of [`MessageInputFlat`](./MessageInputFlat.tsx) from which
 * `MessageInputSmall` "inherited" most of the code with only slight modification to classNames
 * and markup.
 * In case you need to change styling in places where `MessageInputSmall` has been used previously ([`Thread`](../Thread/Thread.tsx))
 * please do so by updating the CSS or by overriding the component itself.
 *
 * **Will be removed with the complete transition to the theming V2 (next major release - `v11.0.0`).**
 */
export declare const MessageInputSmall: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics, V extends CustomTrigger = CustomTrigger>() => JSX.Element;
//# sourceMappingURL=MessageInputSmall.d.ts.map