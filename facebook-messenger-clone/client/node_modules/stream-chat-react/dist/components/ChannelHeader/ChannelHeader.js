import React from 'react';
import { MenuIcon as DefaultMenuIcon } from './icons';
import { Avatar as DefaultAvatar } from '../Avatar';
import { useChannelPreviewInfo } from '../ChannelPreview/hooks/useChannelPreviewInfo';
import { useChannelStateContext } from '../../context/ChannelStateContext';
import { useChatContext } from '../../context/ChatContext';
import { useTranslationContext } from '../../context/TranslationContext';
var UnMemoizedChannelHeader = function (props) {
    var _a = props.Avatar, Avatar = _a === void 0 ? DefaultAvatar : _a, _b = props.MenuIcon, MenuIcon = _b === void 0 ? DefaultMenuIcon : _b, overrideImage = props.image, live = props.live, overrideTitle = props.title;
    var _c = useChannelStateContext('ChannelHeader'), channel = _c.channel, watcher_count = _c.watcher_count;
    var openMobileNav = useChatContext('ChannelHeader').openMobileNav;
    var t = useTranslationContext('ChannelHeader').t;
    var _d = useChannelPreviewInfo({
        channel: channel,
        overrideImage: overrideImage,
        overrideTitle: overrideTitle,
    }), displayImage = _d.displayImage, displayTitle = _d.displayTitle;
    var _e = (channel === null || channel === void 0 ? void 0 : channel.data) || {}, member_count = _e.member_count, subtitle = _e.subtitle;
    return (React.createElement("div", { className: 'str-chat__header-livestream str-chat__channel-header' },
        React.createElement("button", { "aria-label": 'Menu', className: 'str-chat__header-hamburger', onClick: openMobileNav },
            React.createElement(MenuIcon, null)),
        React.createElement(Avatar, { image: displayImage, name: displayTitle, shape: 'rounded', size: (channel === null || channel === void 0 ? void 0 : channel.type) === 'commerce' ? 60 : 40 }),
        React.createElement("div", { className: 'str-chat__header-livestream-left str-chat__channel-header-end' },
            React.createElement("p", { className: 'str-chat__header-livestream-left--title str-chat__channel-header-title' },
                displayTitle,
                ' ',
                live && (React.createElement("span", { className: 'str-chat__header-livestream-left--livelabel' }, t('live')))),
            subtitle && React.createElement("p", { className: 'str-chat__header-livestream-left--subtitle' }, subtitle),
            React.createElement("p", { className: 'str-chat__header-livestream-left--members str-chat__channel-header-info' },
                !live && !!member_count && member_count > 0 && (React.createElement(React.Fragment, null,
                    t('{{ memberCount }} members', {
                        memberCount: member_count,
                    }),
                    ",",
                    ' ')),
                t('{{ watcherCount }} online', { watcherCount: watcher_count })))));
};
/**
 * The ChannelHeader component renders some basic information about a Channel.
 */
export var ChannelHeader = React.memo(UnMemoizedChannelHeader);
