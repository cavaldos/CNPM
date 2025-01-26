import React, { useMemo } from 'react';
import { useMessageContext } from '../../context/MessageContext';
import { isDate, useTranslationContext } from '../../context/TranslationContext';
import { getDateString } from '../../i18n/utils';
export var defaultTimestampFormat = 'h:mmA';
var UnMemoizedMessageTimestamp = function (props) {
    var _a = props.calendar, calendar = _a === void 0 ? false : _a, _b = props.customClass, customClass = _b === void 0 ? '' : _b, _c = props.format, format = _c === void 0 ? defaultTimestampFormat : _c, propMessage = props.message;
    var _d = useMessageContext('MessageTimestamp'), formatDate = _d.formatDate, contextMessage = _d.message;
    var tDateTimeParser = useTranslationContext('MessageTimestamp').tDateTimeParser;
    var message = propMessage || contextMessage;
    var messageCreatedAt = message.created_at && isDate(message.created_at)
        ? message.created_at.toISOString()
        : message.created_at;
    var when = useMemo(function () { return getDateString({ calendar: calendar, format: format, formatDate: formatDate, messageCreatedAt: messageCreatedAt, tDateTimeParser: tDateTimeParser }); }, [formatDate, calendar, tDateTimeParser, format, messageCreatedAt]);
    if (!when)
        return null;
    return (React.createElement("time", { className: customClass, dateTime: messageCreatedAt, title: messageCreatedAt }, when));
};
export var MessageTimestamp = React.memo(UnMemoizedMessageTimestamp);
