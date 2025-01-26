import React from 'react';
import { DownloadIcon } from './icons';
import { SafeAnchor } from '../SafeAnchor';
export var DownloadButton = function (_a) {
    var assetUrl = _a.assetUrl;
    return (React.createElement(SafeAnchor, { className: 'str-chat__message-attachment-file--item-download', download: true, href: assetUrl, target: '_blank' },
        React.createElement(DownloadIcon, { className: 'str-chat__message-attachment-download-icon' })));
};
