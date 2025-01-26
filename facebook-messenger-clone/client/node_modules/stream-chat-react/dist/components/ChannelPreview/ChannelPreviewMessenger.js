import React, { useRef } from 'react';
import clsx from 'clsx';
import { Avatar as DefaultAvatar } from '../Avatar';
var UnMemoizedChannelPreviewMessenger = function (props) {
    var _a, _b;
    var active = props.active, _c = props.Avatar, Avatar = _c === void 0 ? DefaultAvatar : _c, channel = props.channel, _d = props.className, customClassName = _d === void 0 ? '' : _d, displayImage = props.displayImage, displayTitle = props.displayTitle, latestMessage = props.latestMessage, customOnSelectChannel = props.onSelect, setActiveChannel = props.setActiveChannel, unread = props.unread, watchers = props.watchers;
    var channelPreviewButton = useRef(null);
    var avatarName = displayTitle || ((_b = (_a = channel.state.messages[channel.state.messages.length - 1]) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id);
    var onSelectChannel = function (e) {
        if (customOnSelectChannel) {
            customOnSelectChannel(e);
        }
        else if (setActiveChannel) {
            setActiveChannel(channel, watchers);
        }
        if (channelPreviewButton === null || channelPreviewButton === void 0 ? void 0 : channelPreviewButton.current) {
            channelPreviewButton.current.blur();
        }
    };
    return (React.createElement("button", { "aria-label": "Select Channel: ".concat(displayTitle || ''), "aria-selected": active, className: clsx("str-chat__channel-preview-messenger str-chat__channel-preview", active && 'str-chat__channel-preview-messenger--active', unread && unread >= 1 && 'str-chat__channel-preview-messenger--unread', customClassName), "data-testid": 'channel-preview-button', onClick: onSelectChannel, ref: channelPreviewButton, role: 'option' },
        React.createElement("div", { className: 'str-chat__channel-preview-messenger--left' },
            React.createElement(Avatar, { image: displayImage, name: avatarName, size: 40 })),
        React.createElement("div", { className: 'str-chat__channel-preview-messenger--right str-chat__channel-preview-end' },
            React.createElement("div", { className: 'str-chat__channel-preview-end-first-row' },
                React.createElement("div", { className: 'str-chat__channel-preview-messenger--name' },
                    React.createElement("span", null, displayTitle)),
                !!unread && (React.createElement("div", { className: 'str-chat__channel-preview-unread-badge', "data-testid": 'unread-badge' }, unread))),
            React.createElement("div", { className: 'str-chat__channel-preview-messenger--last-message' }, latestMessage))));
};
/**
 * Used as preview component for channel item in [ChannelList](#channellist) component.
 * Its best suited for messenger type chat.
 */
export var ChannelPreviewMessenger = React.memo(UnMemoizedChannelPreviewMessenger);
