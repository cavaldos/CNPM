import React, { Suspense } from 'react';
import clsx from 'clsx';
import { useEmojiContext } from '../../context/EmojiContext';
import { useTranslationContext } from '../../context/TranslationContext';
import { useMessageInputContext } from '../../context/MessageInputContext';
var filterEmoji = function (emoji) {
    return !(emoji.name === 'White Smiling Face' || emoji.name === 'White Frowning Face');
};
export var EmojiPicker = function (_a) {
    var small = _a.small;
    var _b = useEmojiContext('EmojiPicker'), emojiConfig = _b.emojiConfig, EmojiPickerComponent = _b.EmojiPicker;
    var t = useTranslationContext('EmojiPicker').t;
    var _c = useMessageInputContext('EmojiPicker'), emojiPickerIsOpen = _c.emojiPickerIsOpen, emojiPickerRef = _c.emojiPickerRef, onSelectEmoji = _c.onSelectEmoji;
    var emojiData = (emojiConfig || {}).emojiData;
    if (!emojiPickerIsOpen || !emojiData)
        return null;
    return (React.createElement("div", { className: clsx('str-chat__emoji-picker-container', {
            'str-chat__input--emojipicker': !small,
            'str-chat__small-message-input-emojipicker': small,
        }), ref: emojiPickerRef },
        React.createElement(Suspense, { fallback: null },
            React.createElement(EmojiPickerComponent, { color: '#006CFF', data: emojiData, emoji: 'point_up', emojisToShowFilter: filterEmoji, native: true, onSelect: onSelectEmoji, set: 'facebook', showPreview: false, showSkinTones: false, title: t('Pick your emoji'), useButton: true }))));
};
