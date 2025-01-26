import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { ArrowDown } from './icons';
import { useChannelStateContext, useChatContext } from '../../context';
var UnMemoizedScrollToBottomButton = function (props) {
    var isMessageListScrolledToBottom = props.isMessageListScrolledToBottom, onClick = props.onClick, threadList = props.threadList;
    var _a = useChatContext(), activeChannel = _a.channel, client = _a.client;
    var thread = useChannelStateContext().thread;
    var _b = useState((activeChannel === null || activeChannel === void 0 ? void 0 : activeChannel.countUnread()) || 0), countUnread = _b[0], setCountUnread = _b[1];
    var _c = useState((thread === null || thread === void 0 ? void 0 : thread.reply_count) || 0), replyCount = _c[0], setReplyCount = _c[1];
    var observedEvent = threadList ? 'message.updated' : 'message.new';
    useEffect(function () {
        var handleEvent = function (event) {
            var _a, _b, _c, _d, _e;
            var newMessageInAnotherChannel = event.cid !== (activeChannel === null || activeChannel === void 0 ? void 0 : activeChannel.cid);
            var newMessageIsMine = ((_a = event.user) === null || _a === void 0 ? void 0 : _a.id) === ((_b = client.user) === null || _b === void 0 ? void 0 : _b.id);
            var isThreadOpen = !!thread;
            var newMessageIsReply = !!((_c = event.message) === null || _c === void 0 ? void 0 : _c.parent_id);
            var dontIncreaseMainListCounterOnNewReply = isThreadOpen && !threadList && newMessageIsReply;
            if (isMessageListScrolledToBottom ||
                newMessageInAnotherChannel ||
                newMessageIsMine ||
                dontIncreaseMainListCounterOnNewReply) {
                return;
            }
            if (event.type === 'message.new') {
                // cannot rely on channel.countUnread because active channel is automatically marked read
                setCountUnread(function (prev) { return prev + 1; });
            }
            else if (((_d = event.message) === null || _d === void 0 ? void 0 : _d.id) === (thread === null || thread === void 0 ? void 0 : thread.id)) {
                var newReplyCount_1 = ((_e = event.message) === null || _e === void 0 ? void 0 : _e.reply_count) || 0;
                setCountUnread(function () { return newReplyCount_1 - replyCount; });
            }
        };
        client.on(observedEvent, handleEvent);
        return function () {
            client.off(observedEvent, handleEvent);
        };
    }, [activeChannel, isMessageListScrolledToBottom, observedEvent, replyCount, thread]);
    useEffect(function () {
        if (isMessageListScrolledToBottom) {
            setCountUnread(0);
            setReplyCount((thread === null || thread === void 0 ? void 0 : thread.reply_count) || 0);
        }
    }, [isMessageListScrolledToBottom, thread]);
    if (isMessageListScrolledToBottom)
        return null;
    return (React.createElement("div", { className: 'str-chat__jump-to-latest-message' },
        React.createElement("button", { "aria-live": 'polite', className: "\n        str-chat__message-notification-right\n        str-chat__message-notification-scroll-to-latest\n        str-chat__circle-fab\n      ", "data-testid": 'message-notification', onClick: onClick },
            React.createElement(ArrowDown, null),
            countUnread > 0 && (React.createElement("div", { className: clsx('str-chat__message-notification', 'str-chat__message-notification-scroll-to-latest-unread-count', 'str-chat__jump-to-latest-unread-count'), "data-testid": 'unread-message-notification-counter' }, countUnread)))));
};
export var ScrollToBottomButton = React.memo(UnMemoizedScrollToBottomButton);
