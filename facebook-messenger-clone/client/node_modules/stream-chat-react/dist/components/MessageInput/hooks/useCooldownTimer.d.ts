import React from 'react';
import type { DefaultStreamChatGenerics } from '../../../types/types';
export declare type CooldownTimerState = {
    cooldownInterval: number;
    setCooldownRemaining: React.Dispatch<React.SetStateAction<number | undefined>>;
    cooldownRemaining?: number;
};
export declare const useCooldownTimer: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>() => CooldownTimerState;
//# sourceMappingURL=useCooldownTimer.d.ts.map