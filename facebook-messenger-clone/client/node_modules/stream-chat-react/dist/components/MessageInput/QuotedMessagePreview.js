import React, { useMemo } from 'react';
import { Avatar as DefaultAvatar } from '../Avatar';
import { CloseIcon } from './icons';
import { useChannelActionContext } from '../../context/ChannelActionContext';
import { useComponentContext } from '../../context/ComponentContext';
import { useTranslationContext } from '../../context/TranslationContext';
import { useChatContext } from '../../context/ChatContext';
export var QuotedMessagePreviewHeader = function () {
    var setQuotedMessage = useChannelActionContext('QuotedMessagePreview').setQuotedMessage;
    var t = useTranslationContext('QuotedMessagePreview').t;
    return (React.createElement("div", { className: 'quoted-message-preview-header str-chat__quoted-message-preview-header' },
        React.createElement("div", { className: 'str-chat__quoted-message-reply-to-message' }, t('Reply to Message')),
        React.createElement("button", { "aria-label": 'Cancel Reply', className: 'str-chat__square-button str-chat__quoted-message-remove', onClick: function () { return setQuotedMessage(undefined); } },
            React.createElement(CloseIcon, null))));
};
export var QuotedMessagePreview = function (_a) {
    var _b;
    var quotedMessage = _a.quotedMessage;
    var _c = useComponentContext('QuotedMessagePreview'), Attachment = _c.Attachment, _d = _c.Avatar, Avatar = _d === void 0 ? DefaultAvatar : _d;
    var userLanguage = useTranslationContext('QuotedMessagePreview').userLanguage;
    var themeVersion = useChatContext('QuotedMessagePreview').themeVersion;
    var quotedMessageText = ((_b = quotedMessage.i18n) === null || _b === void 0 ? void 0 : _b["".concat(userLanguage, "_text")]) ||
        quotedMessage.text;
    var quotedMessageAttachment = useMemo(function () {
        var _a;
        var attachment = ((_a = quotedMessage.attachments) !== null && _a !== void 0 ? _a : [])[0];
        return attachment ? [attachment] : [];
    }, [quotedMessage.attachments]);
    if (!quotedMessageText && !quotedMessageAttachment)
        return null;
    // TODO: remove div.quoted-message-preview-content when deprecating V1 theming
    // move str-chat__quoted-message-preview to main div
    return (React.createElement("div", { className: 'quoted-message-preview', "data-testid": 'quoted-message-preview' },
        themeVersion === '1' && React.createElement(QuotedMessagePreviewHeader, null),
        React.createElement("div", { className: 'quoted-message-preview-content str-chat__quoted-message-preview' },
            quotedMessage.user && (React.createElement(Avatar, { image: quotedMessage.user.image, name: quotedMessage.user.name || quotedMessage.user.id, size: 20, user: quotedMessage.user })),
            React.createElement("div", { className: 'quoted-message-preview-content-inner str-chat__quoted-message-bubble' },
                !!quotedMessageAttachment.length && React.createElement(Attachment, { attachments: quotedMessageAttachment }),
                React.createElement("div", { className: 'str-chat__quoted-message-text', "data-testid": 'quoted-message-text' },
                    themeVersion === '2' && React.createElement("p", null, quotedMessageText),
                    themeVersion === '1' && React.createElement(React.Fragment, null, quotedMessageText))))));
};
