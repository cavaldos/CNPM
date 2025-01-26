import { EmoticonItem } from '../../EmoticonItem/EmoticonItem';
import { useChatContext } from '../../../context/ChatContext';
export var useEmojiTrigger = function (emojiIndex) {
    var themeVersion = useChatContext('useEmojiTrigger').themeVersion;
    return {
        component: EmoticonItem,
        dataProvider: function (query, _, onReady) {
            if (query.length === 0 || query.charAt(0).match(/[^a-zA-Z0-9+-]/)) {
                return [];
            }
            var emojis = (emojiIndex === null || emojiIndex === void 0 ? void 0 : emojiIndex.search(query)) || [];
            // emojiIndex.search sometimes returns undefined values, so filter those out first
            var result = emojis.filter(Boolean).slice(0, themeVersion === '2' ? 7 : 10);
            if (onReady)
                onReady(result, query);
            return result;
        },
        output: function (entity) { return ({
            caretPosition: 'next',
            key: entity.id,
            text: "".concat('native' in entity ? entity.native : ''),
        }); },
    };
};
