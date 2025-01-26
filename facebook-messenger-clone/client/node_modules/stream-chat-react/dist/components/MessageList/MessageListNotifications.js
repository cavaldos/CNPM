import React from 'react';
import { ConnectionStatus } from './ConnectionStatus';
import { CustomNotification } from './CustomNotification';
import { useTranslationContext } from '../../context/TranslationContext';
export var MessageListNotifications = function (props) {
    var hasNewMessages = props.hasNewMessages, isMessageListScrolledToBottom = props.isMessageListScrolledToBottom, isNotAtLatestMessageSet = props.isNotAtLatestMessageSet, MessageNotification = props.MessageNotification, notifications = props.notifications, scrollToBottom = props.scrollToBottom, threadList = props.threadList;
    var t = useTranslationContext('MessageListNotifications').t;
    return (React.createElement("div", { className: 'str-chat__list-notifications' },
        notifications.map(function (notification) { return (React.createElement(CustomNotification, { active: true, key: notification.id, type: notification.type }, notification.text)); }),
        React.createElement(ConnectionStatus, null),
        React.createElement(MessageNotification, { isMessageListScrolledToBottom: isMessageListScrolledToBottom, onClick: scrollToBottom, showNotification: hasNewMessages || isNotAtLatestMessageSet, threadList: threadList }, isNotAtLatestMessageSet ? t('Latest Messages') : t('New Messages!'))));
};
