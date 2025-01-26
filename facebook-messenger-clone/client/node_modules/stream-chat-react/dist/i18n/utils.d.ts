import { MessageContextValue, TDateTimeParser } from '../context';
interface DateFormatterOptions {
    calendar?: boolean;
    format?: string;
    formatDate?: MessageContextValue['formatDate'];
    messageCreatedAt?: string | Date;
    tDateTimeParser?: TDateTimeParser;
}
export declare const notValidDateWarning = "MessageTimestamp was called without a message, or message has invalid created_at date.";
export declare const noParsingFunctionWarning = "MessageTimestamp was called but there is no datetime parsing function available";
export declare function getDateString({ calendar, format, formatDate, messageCreatedAt, tDateTimeParser, }: DateFormatterOptions): string | number | null;
export {};
//# sourceMappingURL=utils.d.ts.map