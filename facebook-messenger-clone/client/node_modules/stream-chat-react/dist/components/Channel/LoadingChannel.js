import React from 'react';
var LoadingMessage = function () { return (React.createElement("div", { className: 'str-chat__loading-channel-message' },
    React.createElement("div", { className: 'str-chat__loading-channel-message-avatar' }),
    React.createElement("div", { className: 'str-chat__loading-channel-message-end' },
        React.createElement("div", { className: 'str-chat__loading-channel-message-sender' }),
        React.createElement("div", { className: 'str-chat__loading-channel-message-last-row' },
            React.createElement("div", { className: 'str-chat__loading-channel-message-text' }),
            React.createElement("div", { className: 'str-chat__loading-channel-message-date' }))))); };
var LoadingMessageInput = function () { return (React.createElement("div", { className: 'str-chat__loading-channel-message-input-row' },
    React.createElement("div", { className: 'str-chat__loading-channel-message-input' }),
    React.createElement("div", { className: 'str-chat__loading-channel-message-send' }))); };
var LoadingChannelHeader = function () { return (React.createElement("div", { className: 'str-chat__loading-channel-header' },
    React.createElement("div", { className: 'str-chat__loading-channel-header-avatar' }),
    React.createElement("div", { className: 'str-chat__loading-channel-header-end' },
        React.createElement("div", { className: 'str-chat__loading-channel-header-name' }),
        React.createElement("div", { className: 'str-chat__loading-channel-header-info' })))); };
export var LoadingChannel = function () { return (React.createElement("div", { className: 'str-chat__loading-channel' },
    React.createElement(LoadingChannelHeader, null),
    React.createElement("div", { className: 'str-chat__loading-channel-message-list' }, Array.from(Array(3)).map(function (_, i) { return (React.createElement(LoadingMessage, { key: "loading-message-".concat(i) })); })),
    React.createElement(LoadingMessageInput, null))); };
