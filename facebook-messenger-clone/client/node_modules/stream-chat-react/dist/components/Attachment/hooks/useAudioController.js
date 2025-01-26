import { useCallback, useEffect, useRef, useState } from 'react';
export var PROGRESS_UPDATE_INTERVAL = 100;
export var useAudioController = function () {
    var _a = useState(false), isPlaying = _a[0], setIsPlaying = _a[1];
    var _b = useState(0), progress = _b[0], setProgress = _b[1];
    var audioRef = useRef(null);
    var togglePlay = useCallback(function () {
        setIsPlaying(function (playing) { return !playing; });
    }, []);
    var seek = useCallback(function (_a) {
        var clientX = _a.clientX, currentTarget = _a.currentTarget;
        if (!audioRef.current)
            return;
        var _b = currentTarget.getBoundingClientRect(), width = _b.width, x = _b.x;
        var ratio = (clientX - x) / width;
        if (!isPlaying)
            setProgress(ratio * 100);
        audioRef.current.currentTime = ratio * audioRef.current.duration;
    }, [isPlaying]);
    useEffect(function () {
        if (!audioRef.current || !isPlaying)
            return;
        var interval = window.setInterval(function () {
            if (!audioRef.current)
                return;
            var _a = audioRef.current, currentTime = _a.currentTime, duration = _a.duration;
            setProgress((currentTime / duration) * 100);
            if (currentTime === duration)
                setIsPlaying(false);
        }, PROGRESS_UPDATE_INTERVAL);
        audioRef.current.play();
        return function () {
            var _a;
            (_a = audioRef.current) === null || _a === void 0 ? void 0 : _a.pause();
            window.clearInterval(interval);
        };
    }, [isPlaying]);
    return {
        audioRef: audioRef,
        isPlaying: isPlaying,
        progress: progress,
        seek: seek,
        togglePlay: togglePlay,
    };
};
