import React from 'react';
import clsx from 'clsx';
import { Avatar as DefaultAvatar } from '../Avatar';
import { useChannelStateContext } from '../../context/ChannelStateContext';
import { useChatContext } from '../../context/ChatContext';
import { useComponentContext } from '../../context/ComponentContext';
import { useTypingContext } from '../../context/TypingContext';
import { useTranslationContext } from '../../context/TranslationContext';
var useJoinTypingUsers = function (names) {
    var t = useTranslationContext().t;
    if (!names.length)
        return null;
    var name = names[0], rest = names.slice(1);
    if (names.length === 1)
        return t('{{ user }} is typing...', {
            user: name,
        });
    var MAX_JOINED_USERS = 3;
    var isLargeArray = names.length > MAX_JOINED_USERS;
    var joinedUsers = (isLargeArray ? names.slice(0, MAX_JOINED_USERS) : rest).join(', ').trim();
    if (isLargeArray)
        return t('{{ users }} and more are typing...', {
            users: joinedUsers,
        });
    return t('{{ users }} and {{ user }} are typing...', {
        user: name,
        users: joinedUsers,
    });
};
/**
 * TypingIndicator lists users currently typing, it needs to be a child of Channel component
 */
var UnMemoizedTypingIndicator = function (props) {
    var PropAvatar = props.Avatar, _a = props.avatarSize, avatarSize = _a === void 0 ? 32 : _a, threadList = props.threadList;
    var _b = useChannelStateContext('TypingIndicator'), channelConfig = _b.channelConfig, thread = _b.thread;
    var _c = useChatContext('TypingIndicator'), client = _c.client, themeVersion = _c.themeVersion;
    var ContextAvatar = useComponentContext('TypingIndicator').Avatar;
    var _d = useTypingContext('TypingIndicator').typing, typing = _d === void 0 ? {} : _d;
    var Avatar = PropAvatar || ContextAvatar || DefaultAvatar;
    var typingInChannel = !threadList
        ? Object.values(typing).filter(function (_a) {
            var _b;
            var parent_id = _a.parent_id, user = _a.user;
            return (user === null || user === void 0 ? void 0 : user.id) !== ((_b = client.user) === null || _b === void 0 ? void 0 : _b.id) && !parent_id;
        })
        : [];
    var typingInThread = threadList
        ? Object.values(typing).filter(function (_a) {
            var _b;
            var parent_id = _a.parent_id, user = _a.user;
            return (user === null || user === void 0 ? void 0 : user.id) !== ((_b = client.user) === null || _b === void 0 ? void 0 : _b.id) && parent_id === (thread === null || thread === void 0 ? void 0 : thread.id);
        })
        : [];
    var typingUserList = (threadList ? typingInThread : typingInChannel)
        .map(function (_a) {
        var user = _a.user;
        return (user === null || user === void 0 ? void 0 : user.name) || (user === null || user === void 0 ? void 0 : user.id);
    })
        .filter(Boolean);
    var joinedTypingUsers = useJoinTypingUsers(typingUserList);
    var isTypingActive = (threadList && typingInThread.length) || (!threadList && typingInChannel.length);
    if ((channelConfig === null || channelConfig === void 0 ? void 0 : channelConfig.typing_events) === false) {
        return null;
    }
    if (themeVersion === '2') {
        if (!isTypingActive)
            return null;
        return (React.createElement("div", { className: clsx('str-chat__typing-indicator', {
                'str-chat__typing-indicator--typing': isTypingActive,
            }), "data-testid": 'typing-indicator' },
            React.createElement("div", { className: 'str-chat__typing-indicator__dots' },
                React.createElement("span", { className: 'str-chat__typing-indicator__dot' }),
                React.createElement("span", { className: 'str-chat__typing-indicator__dot' }),
                React.createElement("span", { className: 'str-chat__typing-indicator__dot' })),
            React.createElement("div", { className: 'str-chat__typing-indicator__users', "data-testid": 'typing-users' }, joinedTypingUsers)));
    }
    return (React.createElement("div", { className: clsx('str-chat__typing-indicator', {
            'str-chat__typing-indicator--typing': isTypingActive,
        }) },
        React.createElement("div", { className: 'str-chat__typing-indicator__avatars' }, (threadList ? typingInThread : typingInChannel).map(function (_a, i) {
            var user = _a.user;
            return (React.createElement(Avatar, { image: user === null || user === void 0 ? void 0 : user.image, key: "".concat(user === null || user === void 0 ? void 0 : user.id, "-").concat(i), name: (user === null || user === void 0 ? void 0 : user.name) || (user === null || user === void 0 ? void 0 : user.id), size: avatarSize, user: user }));
        })),
        React.createElement("div", { className: 'str-chat__typing-indicator__dots' },
            React.createElement("span", { className: 'str-chat__typing-indicator__dot' }),
            React.createElement("span", { className: 'str-chat__typing-indicator__dot' }),
            React.createElement("span", { className: 'str-chat__typing-indicator__dot' }))));
};
export var TypingIndicator = React.memo(UnMemoizedTypingIndicator);
