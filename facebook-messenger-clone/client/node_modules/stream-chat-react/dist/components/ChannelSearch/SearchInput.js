import React from 'react';
import { useTranslationContext } from '../../context/TranslationContext';
export var SearchInput = function (props) {
    var disabled = props.disabled, inputRef = props.inputRef, onSearch = props.onSearch, placeholder = props.placeholder, query = props.query;
    var t = useTranslationContext('SearchInput').t;
    return (React.createElement("input", { className: 'str-chat__channel-search-input', "data-testid": 'search-input', disabled: disabled, onChange: onSearch, placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : t('Search'), ref: inputRef, type: 'text', value: query }));
};
