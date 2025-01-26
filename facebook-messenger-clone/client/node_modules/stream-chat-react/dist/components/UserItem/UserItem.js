import React from 'react';
import clsx from 'clsx';
import { useChatContext } from '../../context/ChatContext';
import { Avatar as DefaultAvatar } from '../Avatar';
/**
 * UI component for mentions rendered in suggestion list
 */
var UnMemoizedUserItem = function (_a) {
    var _b = _a.Avatar, Avatar = _b === void 0 ? DefaultAvatar : _b, entity = _a.entity;
    var themeVersion = useChatContext('UserItem').themeVersion;
    var hasEntity = !!Object.keys(entity).length;
    var itemParts = entity === null || entity === void 0 ? void 0 : entity.itemNameParts;
    var renderName = function () {
        if (!hasEntity)
            return null;
        return itemParts.parts.map(function (part, i) {
            var matches = part.toLowerCase() === itemParts.match.toLowerCase();
            return (React.createElement("span", { className: clsx({
                    'str-chat__emoji-item--highlight': matches,
                    'str-chat__emoji-item--part': !matches,
                }), key: "part-".concat(i) }, part));
        });
    };
    return (React.createElement("div", { className: 'str-chat__user-item' },
        React.createElement(Avatar, { image: entity.image, name: entity.name || entity.id, size: 20 }),
        React.createElement("span", { className: 'str-chat__user-item--name', "data-testid": 'user-item-name' }, renderName()),
        themeVersion === '2' && React.createElement("div", { className: 'str-chat__user-item-at' }, "@")));
};
export var UserItem = React.memo(UnMemoizedUserItem);
