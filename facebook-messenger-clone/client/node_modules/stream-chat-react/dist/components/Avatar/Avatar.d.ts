import React from 'react';
import type { UserResponse } from 'stream-chat';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare type AvatarProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    /** Image URL or default is an image of the first initial of the name if there is one  */
    image?: string | null;
    /** Name of the image, used for title tag fallback */
    name?: string;
    /** click event handler */
    onClick?: (event: React.BaseSyntheticEvent) => void;
    /** mouseOver event handler */
    onMouseOver?: (event: React.BaseSyntheticEvent) => void;
    /** Shape of the avatar - circle, rounded or square
     * @default circle
     */
    shape?: 'circle' | 'rounded' | 'square';
    /** Size in pixels
     * @default 32px
     */
    size?: number;
    /** The entire user object for the chat user displayed in the component */
    user?: UserResponse<StreamChatGenerics>;
};
/**
 * A round avatar image with fallback to username's first letter
 */
export declare const Avatar: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: AvatarProps<StreamChatGenerics>) => JSX.Element;
//# sourceMappingURL=Avatar.d.ts.map