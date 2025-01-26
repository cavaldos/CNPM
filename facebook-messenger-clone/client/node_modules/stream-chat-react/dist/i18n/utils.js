import { isDate, isDayOrMoment, isNumberOrString, } from '../context';
export var notValidDateWarning = 'MessageTimestamp was called without a message, or message has invalid created_at date.';
export var noParsingFunctionWarning = 'MessageTimestamp was called but there is no datetime parsing function available';
export function getDateString(_a) {
    var calendar = _a.calendar, format = _a.format, formatDate = _a.formatDate, messageCreatedAt = _a.messageCreatedAt, tDateTimeParser = _a.tDateTimeParser;
    if (!messageCreatedAt ||
        (typeof messageCreatedAt === 'string' && !Date.parse(messageCreatedAt))) {
        console.warn(notValidDateWarning);
        return null;
    }
    if (typeof formatDate === 'function') {
        return formatDate(new Date(messageCreatedAt));
    }
    if (!tDateTimeParser) {
        console.warn(noParsingFunctionWarning);
        return null;
    }
    var parsedTime = tDateTimeParser(messageCreatedAt);
    if (isDayOrMoment(parsedTime)) {
        /**
         * parsedTime.calendar is guaranteed on the type but is only
         * available when a user calls dayjs.extend(calendar)
         */
        return calendar && parsedTime.calendar ? parsedTime.calendar() : parsedTime.format(format);
    }
    if (isDate(parsedTime)) {
        return parsedTime.toDateString();
    }
    if (isNumberOrString(parsedTime)) {
        return parsedTime;
    }
    return null;
}
