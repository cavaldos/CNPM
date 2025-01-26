import React from 'react';
import { useTranslationContext } from '../../context/TranslationContext';
export var CloseIcon = function (_a) {
    var title = _a.title;
    var t = useTranslationContext('CloseIcon').t;
    return (React.createElement("svg", { "data-testid": 'close-no-outline', fill: 'none', viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' },
        React.createElement("title", null, title !== null && title !== void 0 ? title : t('Close')),
        React.createElement("path", { d: 'M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z', fill: 'black' })));
};
