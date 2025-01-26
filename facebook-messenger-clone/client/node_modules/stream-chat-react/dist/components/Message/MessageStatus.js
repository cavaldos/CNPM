import React, { useState } from 'react';
import clsx from 'clsx';
import { DeliveredCheckIcon, MessageDeliveredIcon } from './icons';
import { getReadByTooltipText, mapToUserNameOrId } from './utils';
import { Avatar as DefaultAvatar } from '../Avatar';
import { LoadingIndicator } from '../Loading';
import { PopperTooltip, Tooltip } from '../Tooltip';
import { useEnterLeaveHandlers } from '../Tooltip/hooks';
import { useChatContext } from '../../context/ChatContext';
import { useComponentContext } from '../../context/ComponentContext';
import { useMessageContext } from '../../context/MessageContext';
import { useTranslationContext } from '../../context/TranslationContext';
var UnMemoizedMessageStatus = function (props) {
    var _a;
    var propAvatar = props.Avatar, _b = props.messageType, messageType = _b === void 0 ? 'simple' : _b, _c = props.tooltipUserNameMapper, tooltipUserNameMapper = _c === void 0 ? mapToUserNameOrId : _c;
    var _d = useEnterLeaveHandlers(), handleEnter = _d.handleEnter, handleLeave = _d.handleLeave, tooltipVisible = _d.tooltipVisible;
    var client = useChatContext('MessageStatus').client;
    var contextAvatar = useComponentContext('MessageStatus').Avatar;
    var _e = useMessageContext('MessageStatus'), isMyMessage = _e.isMyMessage, lastReceivedId = _e.lastReceivedId, message = _e.message, readBy = _e.readBy, threadList = _e.threadList;
    var t = useTranslationContext('MessageStatus').t;
    var themeVersion = useChatContext('MessageStatus').themeVersion;
    var _f = useState(null), referenceElement = _f[0], setReferenceElement = _f[1];
    var Avatar = propAvatar || contextAvatar || DefaultAvatar;
    if (!isMyMessage() || message.type === 'error')
        return null;
    var justReadByMe = (readBy === null || readBy === void 0 ? void 0 : readBy.length) === 1 && readBy[0].id === ((_a = client.user) === null || _a === void 0 ? void 0 : _a.id);
    var rootClassName = "str-chat__message-".concat(messageType, "-status str-chat__message-status");
    var sending = message.status === 'sending';
    var delivered = message.status === 'received' && message.id === lastReceivedId && !threadList;
    var deliveredAndRead = !!((readBy === null || readBy === void 0 ? void 0 : readBy.length) && !threadList && !justReadByMe);
    var lastReadUser = (deliveredAndRead
        ? readBy.filter(function (item) { var _a; return item.id !== ((_a = client.user) === null || _a === void 0 ? void 0 : _a.id); })
        : [])[0];
    return (React.createElement("span", { className: rootClassName, "data-testid": clsx({
            'message-status-read-by': deliveredAndRead,
            'message-status-received': delivered && !deliveredAndRead,
            'message-status-sending': sending,
        }), onMouseEnter: handleEnter, onMouseLeave: handleLeave, ref: setReferenceElement },
        sending && (React.createElement(React.Fragment, null,
            themeVersion === '1' && React.createElement(Tooltip, null, t('Sending...')),
            themeVersion === '2' && (React.createElement(PopperTooltip, { offset: [0, 5], referenceElement: referenceElement, visible: tooltipVisible }, t('Sending...'))),
            React.createElement(LoadingIndicator, null))),
        delivered && !deliveredAndRead && (React.createElement(React.Fragment, null,
            themeVersion === '1' && React.createElement(Tooltip, null, t('Delivered')),
            themeVersion === '2' && (React.createElement(PopperTooltip, { offset: [0, 5], referenceElement: referenceElement, visible: tooltipVisible }, t('Delivered'))),
            themeVersion === '2' ? React.createElement(MessageDeliveredIcon, null) : React.createElement(DeliveredCheckIcon, null))),
        deliveredAndRead && (React.createElement(React.Fragment, null,
            themeVersion === '1' && (React.createElement(Tooltip, null, getReadByTooltipText(readBy, t, client, tooltipUserNameMapper))),
            themeVersion === '2' && (React.createElement(PopperTooltip, { offset: [0, 5], referenceElement: referenceElement, visible: tooltipVisible }, getReadByTooltipText(readBy, t, client, tooltipUserNameMapper))),
            React.createElement(Avatar, { image: lastReadUser.image, name: lastReadUser.name || lastReadUser.id, size: 15, user: lastReadUser }),
            readBy.length > 2 && (React.createElement("span", { className: "str-chat__message-".concat(messageType, "-status-number"), "data-testid": 'message-status-read-by-many' }, readBy.length - 1))))));
};
export var MessageStatus = React.memo(UnMemoizedMessageStatus);
