export declare const PROGRESS_UPDATE_INTERVAL = 100;
export declare const useAudioController: () => {
    audioRef: import("react").MutableRefObject<HTMLAudioElement | null>;
    isPlaying: boolean;
    progress: number;
    seek: import("react").MouseEventHandler<HTMLDivElement>;
    togglePlay: () => void;
};
//# sourceMappingURL=useAudioController.d.ts.map