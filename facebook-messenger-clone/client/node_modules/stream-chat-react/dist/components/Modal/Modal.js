import React, { useEffect, useRef } from 'react';
import { CloseIconRound } from './icons';
import { useChatContext, useTranslationContext } from '../../context';
export var Modal = function (_a) {
    var children = _a.children, onClose = _a.onClose, open = _a.open;
    var t = useTranslationContext('Modal').t;
    var themeVersion = useChatContext('Modal').themeVersion;
    var innerRef = useRef(null);
    var closeRef = useRef(null);
    var handleClick = function (event) {
        var target = event.target;
        if (!innerRef.current || !closeRef.current)
            return;
        if (!innerRef.current.contains(target) || closeRef.current.contains(target))
            onClose === null || onClose === void 0 ? void 0 : onClose(event);
    };
    useEffect(function () {
        if (!open)
            return;
        var handleKeyDown = function (event) {
            if (event.key === 'Escape')
                onClose === null || onClose === void 0 ? void 0 : onClose(event);
        };
        document.addEventListener('keydown', handleKeyDown);
        return function () { return document.removeEventListener('keydown', handleKeyDown); };
    }, [onClose, open]);
    if (!open)
        return null;
    return (React.createElement("div", { className: 'str-chat__modal str-chat__modal--open', onClick: handleClick },
        React.createElement("button", { className: 'str-chat__modal__close-button', ref: closeRef, title: t('Close') },
            themeVersion === '2' && React.createElement(CloseIconRound, null),
            themeVersion === '1' && (React.createElement(React.Fragment, null,
                t('Close'),
                React.createElement("svg", { height: '10', width: '10', xmlns: 'http://www.w3.org/2000/svg' },
                    React.createElement("path", { d: 'M9.916 1.027L8.973.084 5 4.058 1.027.084l-.943.943L4.058 5 .084 8.973l.943.943L5 5.942l3.973 3.974.943-.943L5.942 5z', fillRule: 'evenodd' }))))),
        React.createElement("div", { className: 'str-chat__modal__inner str-chat-react__modal__inner', ref: innerRef }, children)));
};
