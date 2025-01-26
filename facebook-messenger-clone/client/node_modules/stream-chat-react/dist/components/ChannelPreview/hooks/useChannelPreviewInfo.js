import { useEffect, useState } from 'react';
import { getDisplayImage, getDisplayTitle } from '../utils';
import { useChatContext } from '../../../context';
export var useChannelPreviewInfo = function (props) {
    var channel = props.channel, overrideImage = props.overrideImage, overrideTitle = props.overrideTitle;
    var client = useChatContext('ChannelPreview').client;
    var _a = useState(getDisplayTitle(channel, client.user)), displayTitle = _a[0], setDisplayTitle = _a[1];
    var _b = useState(getDisplayImage(channel, client.user)), displayImage = _b[0], setDisplayImage = _b[1];
    useEffect(function () {
        var handleEvent = function () {
            setDisplayTitle(function (displayTitle) {
                var newDisplayTitle = getDisplayTitle(channel, client.user);
                return displayTitle !== newDisplayTitle ? newDisplayTitle : displayTitle;
            });
            setDisplayImage(function (displayImage) {
                var newDisplayImage = getDisplayImage(channel, client.user);
                return displayImage !== newDisplayImage ? newDisplayImage : displayImage;
            });
        };
        client.on('user.updated', handleEvent);
        return function () {
            client.off('user.updated', handleEvent);
        };
    }, []);
    return {
        displayImage: overrideImage || displayImage,
        displayTitle: overrideTitle || displayTitle,
    };
};
