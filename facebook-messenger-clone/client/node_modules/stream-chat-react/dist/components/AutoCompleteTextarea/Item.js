import React, { useCallback } from 'react';
import clsx from 'clsx';
import { useChatContext } from '../../context/ChatContext';
export var Item = React.forwardRef(function Item(props, innerRef) {
    var className = props.className, Component = props.component, item = props.item, onClickHandler = props.onClickHandler, onSelectHandler = props.onSelectHandler, selected = props.selected, style = props.style;
    var themeVersion = useChatContext('SuggestionItem').themeVersion;
    var selectItem = useCallback(function () { return onSelectHandler(item); }, [item, onClickHandler]);
    if (themeVersion === '2')
        return (React.createElement("li", { className: clsx(className, { 'str-chat__suggestion-item--selected': selected }), style: style },
            React.createElement("a", { href: '', onClick: onClickHandler, onFocus: selectItem, onMouseEnter: selectItem, ref: innerRef },
                React.createElement(Component, { entity: item, selected: selected }))));
    return (React.createElement("li", { className: clsx('rta__item', className), style: style },
        React.createElement("button", { className: clsx('rta__entity', { 'rta__entity--selected': selected }), onClick: onClickHandler, onFocus: selectItem, onMouseEnter: selectItem, ref: innerRef },
            React.createElement("div", { tabIndex: -1 },
                React.createElement(Component, { entity: item, selected: selected })))));
});
