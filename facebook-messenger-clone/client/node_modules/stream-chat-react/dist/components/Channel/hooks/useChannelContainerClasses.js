import { useChatContext } from '../../../context/ChatContext';
export var useChannelContainerClasses = function (_a) {
    var _b, _c, _d;
    var customClasses = _a.customClasses;
    var useImageFlagEmojisOnWindows = useChatContext('Channel').useImageFlagEmojisOnWindows;
    return {
        channelClass: (_b = customClasses === null || customClasses === void 0 ? void 0 : customClasses.channel) !== null && _b !== void 0 ? _b : 'str-chat-channel str-chat__channel',
        chatClass: (_c = customClasses === null || customClasses === void 0 ? void 0 : customClasses.chat) !== null && _c !== void 0 ? _c : 'str-chat',
        chatContainerClass: (_d = customClasses === null || customClasses === void 0 ? void 0 : customClasses.chatContainer) !== null && _d !== void 0 ? _d : 'str-chat__container',
        windowsEmojiClass: useImageFlagEmojisOnWindows && navigator.userAgent.match(/Win/)
            ? 'str-chat--windows-flags'
            : '',
    };
};
