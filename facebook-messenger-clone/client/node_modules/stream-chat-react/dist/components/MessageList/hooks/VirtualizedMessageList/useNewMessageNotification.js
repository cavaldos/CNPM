import { useEffect, useRef, useState } from 'react';
export function useNewMessageNotification(messages, currentUserId, hasMoreNewer) {
    var _a = useState(false), newMessagesNotification = _a[0], setNewMessagesNotification = _a[1];
    var _b = useState(true), isMessageListScrolledToBottom = _b[0], setIsMessageListScrolledToBottom = _b[1];
    /**
     * use the flag to avoid the initial "new messages" quick blink
     */
    var didMount = useRef(false);
    var lastMessageId = useRef('');
    var atBottom = useRef(false);
    useEffect(function () {
        var _a;
        if (hasMoreNewer) {
            setNewMessagesNotification(true);
            return;
        }
        /* handle scrolling behavior for new messages */
        if (!(messages === null || messages === void 0 ? void 0 : messages.length))
            return;
        var lastMessage = messages[messages.length - 1];
        var prevMessageId = lastMessageId.current;
        lastMessageId.current = lastMessage.id || ''; // update last message id
        /* do nothing if new messages are loaded from top(loadMore)  */
        if (lastMessage.id === prevMessageId)
            return;
        /* if list is already at the bottom return, followOutput will do the job */
        if (atBottom.current)
            return;
        /* if the new message belongs to current user scroll to bottom */
        if (((_a = lastMessage.user) === null || _a === void 0 ? void 0 : _a.id) !== currentUserId && didMount.current) {
            /* otherwise just show newMessage notification  */
            setNewMessagesNotification(true);
        }
        didMount.current = true;
    }, [currentUserId, messages, hasMoreNewer]);
    return {
        atBottom: atBottom,
        isMessageListScrolledToBottom: isMessageListScrolledToBottom,
        newMessagesNotification: newMessagesNotification,
        setIsMessageListScrolledToBottom: setIsMessageListScrolledToBottom,
        setNewMessagesNotification: setNewMessagesNotification,
    };
}
