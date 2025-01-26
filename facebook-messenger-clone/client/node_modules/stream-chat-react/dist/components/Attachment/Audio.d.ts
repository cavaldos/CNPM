import React from 'react';
import type { Attachment } from 'stream-chat';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare type AudioProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    og: Attachment<StreamChatGenerics>;
};
declare type PlayButtonProps = {
    isPlaying: boolean;
    onClick: () => void;
};
export declare const PlayButton: ({ isPlaying, onClick }: PlayButtonProps) => JSX.Element;
declare type ProgressBarProps = {
    progress: number;
} & Pick<React.ComponentProps<'div'>, 'onClick'>;
export declare const ProgressBar: ({ onClick, progress }: ProgressBarProps) => JSX.Element;
/**
 * Audio attachment with play/pause button and progress bar
 */
export declare const Audio: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: AudioProps<StreamChatGenerics>) => JSX.Element;
export {};
//# sourceMappingURL=Audio.d.ts.map