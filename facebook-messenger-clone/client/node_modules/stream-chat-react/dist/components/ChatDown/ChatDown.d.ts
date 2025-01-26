import React from 'react';
export declare type ChatDownProps = {
    /** The image url for this error or ReactElement representing the image */
    image?: string | React.ReactElement;
    /** The error message to show */
    text?: string;
    /** The type of error */
    type?: string;
};
/**
 * A simple indicator that chat functionality isn't available, triggered when the Chat API is unavailable or your network isn't working.
 */
export declare const ChatDown: ({ image, text, type, }: ChatDownProps) => JSX.Element;
//# sourceMappingURL=ChatDown.d.ts.map