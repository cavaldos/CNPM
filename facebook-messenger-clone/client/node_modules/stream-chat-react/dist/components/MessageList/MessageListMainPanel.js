import React from 'react';
import { useChatContext } from '../../context/ChatContext';
export var MessageListMainPanel = function (_a) {
    var children = _a.children;
    var themeVersion = useChatContext('MessageListMainPanel').themeVersion;
    if (themeVersion === '2')
        return React.createElement("div", { className: 'str-chat__main-panel-inner' }, children);
    return React.createElement(React.Fragment, null, children);
};
