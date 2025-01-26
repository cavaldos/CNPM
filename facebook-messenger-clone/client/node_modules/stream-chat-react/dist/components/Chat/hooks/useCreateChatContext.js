import { useMemo } from 'react';
export var useCreateChatContext = function (value) {
    var _a;
    var channel = value.channel, channelsQueryState = value.channelsQueryState, client = value.client, closeMobileNav = value.closeMobileNav, customClasses = value.customClasses, getAppSettings = value.getAppSettings, latestMessageDatesByChannels = value.latestMessageDatesByChannels, mutes = value.mutes, navOpen = value.navOpen, openMobileNav = value.openMobileNav, setActiveChannel = value.setActiveChannel, theme = value.theme, themeVersion = value.themeVersion, useImageFlagEmojisOnWindows = value.useImageFlagEmojisOnWindows;
    var channelCid = channel === null || channel === void 0 ? void 0 : channel.cid;
    var channelsQueryError = channelsQueryState.error;
    var channelsQueryInProgress = channelsQueryState.queryInProgress;
    var clientValues = "".concat(client.clientID).concat(Object.keys(client.activeChannels).length).concat(Object.keys(client.listeners).length).concat(client.mutedChannels.length, "\n  ").concat((_a = client.user) === null || _a === void 0 ? void 0 : _a.id);
    var mutedUsersLength = mutes.length;
    var chatContext = useMemo(function () { return ({
        channel: channel,
        channelsQueryState: channelsQueryState,
        client: client,
        closeMobileNav: closeMobileNav,
        customClasses: customClasses,
        getAppSettings: getAppSettings,
        latestMessageDatesByChannels: latestMessageDatesByChannels,
        mutes: mutes,
        navOpen: navOpen,
        openMobileNav: openMobileNav,
        setActiveChannel: setActiveChannel,
        theme: theme,
        themeVersion: themeVersion,
        useImageFlagEmojisOnWindows: useImageFlagEmojisOnWindows,
    }); }, [
        channelCid,
        channelsQueryError,
        channelsQueryInProgress,
        clientValues,
        getAppSettings,
        mutedUsersLength,
        navOpen,
    ]);
    return chatContext;
};
