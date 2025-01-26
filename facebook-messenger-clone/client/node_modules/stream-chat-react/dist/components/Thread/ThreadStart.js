import React from 'react';
import { useChannelStateContext } from '../../context/ChannelStateContext';
import { useTranslationContext } from '../../context/TranslationContext';
export var ThreadStart = function () {
    var thread = useChannelStateContext('ThreadStart').thread;
    var t = useTranslationContext('ThreadStart').t;
    if (!(thread === null || thread === void 0 ? void 0 : thread.reply_count))
        return null;
    return (React.createElement("div", { className: 'str-chat__thread-start' }, t('replyCount', { count: thread.reply_count })));
};
