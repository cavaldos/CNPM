import { useCallback, useMemo } from 'react';
import { getStrippedEmojiData } from '../../Channel/emojiData';
import { useMessageContext } from '../../../context';
export var useProcessReactions = function (params) {
    var _a = params.additionalEmojiProps, additionalEmojiProps = _a === void 0 ? {} : _a, emojiConfig = params.emojiConfig, propOwnReactions = params.own_reactions, propReactionCounts = params.reaction_counts, propReactionOptions = params.reactionOptions, propReactions = params.reactions;
    var message = useMessageContext('ReactionsList').message;
    var _b = emojiConfig || {}, defaultMinimalEmojis = _b.defaultMinimalEmojis, fullEmojiData = _b.emojiData, emojiSetDef = _b.emojiSetDef;
    var latestReactions = propReactions || message.latest_reactions || [];
    var ownReactions = propOwnReactions || (message === null || message === void 0 ? void 0 : message.own_reactions) || [];
    var reactionCounts = propReactionCounts || message.reaction_counts || {};
    var reactionOptions = propReactionOptions || defaultMinimalEmojis;
    var reactionsAreCustom = !!(propReactionOptions === null || propReactionOptions === void 0 ? void 0 : propReactionOptions.length);
    var iHaveReactedWithReaction = useCallback(function (reactionType) { return ownReactions.find(function (reaction) { return reaction.type === reactionType; }); }, [ownReactions]);
    var getEmojiByReactionType = useCallback(function (type) {
        return reactionOptions.find(function (option) { return option.id === type; });
    }, [reactionOptions]);
    var emojiData = useMemo(function () { return (reactionsAreCustom ? fullEmojiData : getStrippedEmojiData(fullEmojiData)); }, [fullEmojiData, reactionsAreCustom]);
    var latestReactionTypes = useMemo(function () {
        return latestReactions.reduce(function (reactionTypes, _a) {
            var type = _a.type;
            if (reactionTypes.indexOf(type) === -1) {
                reactionTypes.push(type);
            }
            return reactionTypes;
        }, []);
    }, [latestReactions]);
    var supportedReactionMap = useMemo(function () {
        return reactionOptions.reduce(function (acc, _a) {
            var id = _a.id;
            acc[id] = true;
            return acc;
        }, {});
    }, [reactionOptions]);
    var supportedReactionsArePresent = useMemo(function () { return latestReactionTypes.some(function (type) { return supportedReactionMap[type]; }); }, [latestReactionTypes, supportedReactionMap]);
    var totalReactionCount = useMemo(function () {
        return supportedReactionsArePresent
            ? Object.values(reactionCounts).reduce(function (total, count) { return total + count; }, 0)
            : 0;
    }, [reactionCounts, supportedReactionsArePresent]);
    var aggregatedUserNamesByType = useMemo(function () {
        return latestReactions.reduce(function (typeMap, _a) {
            var _b;
            var type = _a.type, user = _a.user;
            (_b = typeMap[type]) !== null && _b !== void 0 ? _b : (typeMap[type] = []);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            typeMap[type].push((user === null || user === void 0 ? void 0 : user.name) || user.id);
            return typeMap;
        }, {});
    }, [latestReactions]);
    return {
        additionalEmojiProps: reactionsAreCustom ? additionalEmojiProps : emojiSetDef,
        aggregatedUserNamesByType: aggregatedUserNamesByType,
        emojiData: emojiData,
        getEmojiByReactionType: getEmojiByReactionType,
        iHaveReactedWithReaction: iHaveReactedWithReaction,
        latestReactions: latestReactions,
        latestReactionTypes: latestReactionTypes,
        reactionCounts: reactionCounts,
        supportedReactionsArePresent: supportedReactionsArePresent,
        totalReactionCount: totalReactionCount,
    };
};
