import React from 'react';
import { useTranslationContext } from '../../context/TranslationContext';
import { ConnectionErrorIcon } from './icons';
var UnMemoizedChatDown = function (_a) {
    var _b = _a.image, image = _b === void 0 ? React.createElement(ConnectionErrorIcon, null) : _b, text = _a.text, _c = _a.type, type = _c === void 0 ? 'Error' : _c;
    var t = useTranslationContext('ChatDown').t;
    return (React.createElement("div", { className: 'str-chat__down' },
        React.createElement("div", { className: 'str-chat__down-main' },
            typeof image === 'string' ? (React.createElement("img", { alt: 'Connection error', "data-testid": 'chatdown-img', src: image })) : (image),
            React.createElement("h1", null, type),
            React.createElement("h3", { "aria-live": 'assertive' }, text || t('Error connecting to chat, refresh the page to try again.')))));
};
/**
 * A simple indicator that chat functionality isn't available, triggered when the Chat API is unavailable or your network isn't working.
 */
export var ChatDown = React.memo(UnMemoizedChatDown);
