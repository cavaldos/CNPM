import React from 'react';
import { ReplyIcon } from './icons';
import { useChatContext } from '../../context/ChatContext';
import { useTranslationContext } from '../../context/TranslationContext';
var UnMemoizedMessageRepliesCountButton = function (props) {
    var labelPlural = props.labelPlural, labelSingle = props.labelSingle, onClick = props.onClick, _a = props.reply_count, reply_count = _a === void 0 ? 0 : _a;
    var t = useTranslationContext('MessageRepliesCountButton').t;
    var themeVersion = useChatContext('MessageRepliesCountButton').themeVersion;
    if (!reply_count)
        return null;
    var replyCountText = t('replyCount', { count: reply_count });
    if (labelPlural && reply_count > 1) {
        replyCountText = "".concat(reply_count, " ").concat(labelPlural);
    }
    else if (labelSingle) {
        replyCountText = "1 ".concat(labelSingle);
    }
    return (React.createElement("div", { className: 'str-chat__message-simple-reply-button str-chat__message-replies-count-button-wrapper' },
        React.createElement("button", { className: 'str-chat__message-replies-count-button', "data-testid": 'replies-count-button', onClick: onClick },
            themeVersion === '1' && React.createElement(ReplyIcon, null),
            replyCountText)));
};
export var MessageRepliesCountButton = React.memo(UnMemoizedMessageRepliesCountButton);
