import React from 'react';
import { ActionsIcon as DefaultActionsIcon, ReactionIcon as DefaultReactionIcon, ThreadIcon as DefaultThreadIcon, } from './icons';
import { MESSAGE_ACTIONS, showMessageActionsBox } from './utils';
import { MessageActions } from '../MessageActions';
import { useMessageContext } from '../../context/MessageContext';
var UnMemoizedMessageOptions = function (props) {
    var _a = props.ActionsIcon, ActionsIcon = _a === void 0 ? DefaultActionsIcon : _a, _b = props.displayReplies, displayReplies = _b === void 0 ? true : _b, propHandleOpenThread = props.handleOpenThread, messageWrapperRef = props.messageWrapperRef, _c = props.ReactionIcon, ReactionIcon = _c === void 0 ? DefaultReactionIcon : _c, _d = props.theme, theme = _d === void 0 ? 'simple' : _d, _e = props.ThreadIcon, ThreadIcon = _e === void 0 ? DefaultThreadIcon : _e;
    var _f = useMessageContext('MessageOptions'), customMessageActions = _f.customMessageActions, getMessageActions = _f.getMessageActions, contextHandleOpenThread = _f.handleOpenThread, initialMessage = _f.initialMessage, message = _f.message, onReactionListClick = _f.onReactionListClick, threadList = _f.threadList;
    var handleOpenThread = propHandleOpenThread || contextHandleOpenThread;
    var messageActions = getMessageActions();
    var showActionsBox = showMessageActionsBox(messageActions, threadList) || !!customMessageActions;
    var shouldShowReactions = messageActions.indexOf(MESSAGE_ACTIONS.react) > -1;
    var shouldShowReplies = messageActions.indexOf(MESSAGE_ACTIONS.reply) > -1 && displayReplies && !threadList;
    if (!message.type ||
        message.type === 'error' ||
        message.type === 'system' ||
        message.type === 'ephemeral' ||
        message.status === 'failed' ||
        message.status === 'sending' ||
        initialMessage) {
        return null;
    }
    var rootClassName = "str-chat__message-".concat(theme, "__actions str-chat__message-options");
    return (React.createElement("div", { className: rootClassName, "data-testid": 'message-options' },
        showActionsBox && (React.createElement(MessageActions, { ActionsIcon: ActionsIcon, messageWrapperRef: messageWrapperRef })),
        shouldShowReplies && (React.createElement("button", { "aria-label": 'Open Thread', className: "str-chat__message-".concat(theme, "__actions__action str-chat__message-").concat(theme, "__actions__action--thread str-chat__message-reply-in-thread-button"), "data-testid": 'thread-action', onClick: handleOpenThread },
            React.createElement(ThreadIcon, { className: 'str-chat__message-action-icon' }))),
        shouldShowReactions && (React.createElement("button", { "aria-label": 'Open Reaction Selector', className: "str-chat__message-".concat(theme, "__actions__action str-chat__message-").concat(theme, "__actions__action--reactions str-chat__message-reactions-button"), "data-testid": 'message-reaction-action', onClick: onReactionListClick },
            React.createElement(ReactionIcon, { className: 'str-chat__message-action-icon' })))));
};
export var MessageOptions = React.memo(UnMemoizedMessageOptions);
