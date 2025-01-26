import React, { useCallback, useEffect, useState } from 'react';
import clsx from 'clsx';
import { SearchIcon } from './icons';
import { ChannelPreview } from '../ChannelPreview';
import { isChannel } from './utils';
import { Avatar } from '../Avatar';
import { useChatContext, useTranslationContext } from '../../context';
var DefaultSearchEmpty = function () {
    var t = useTranslationContext('SearchResults').t;
    return (React.createElement("div", { "aria-live": 'polite', className: 'str-chat__channel-search-container-empty' },
        React.createElement(SearchIcon, null),
        t('No results found')));
};
var DefaultSearchResultsHeader = function (_a) {
    var results = _a.results;
    var t = useTranslationContext('SearchResultsHeader').t;
    return (React.createElement("div", { className: 'str-chat__channel-search-results-header', "data-testid": 'channel-search-results-header' }, t('searchResultsCount', {
        count: results.length,
    })));
};
var DefaultSearchResultsList = function (props) {
    var focusedUser = props.focusedUser, results = props.results, _a = props.SearchResultItem, SearchResultItem = _a === void 0 ? DefaultSearchResultItem : _a, selectResult = props.selectResult;
    return (React.createElement(React.Fragment, null, results.map(function (result, index) { return (React.createElement(SearchResultItem, { focusedUser: focusedUser, index: index, key: index, result: result, selectResult: selectResult })); })));
};
var DefaultSearchResultItem = function (props) {
    var _a, _b;
    var focusedUser = props.focusedUser, index = props.index, result = props.result, selectResult = props.selectResult;
    var focused = focusedUser === index;
    var themeVersion = useChatContext().themeVersion;
    var className = clsx('str-chat__channel-search-result', focused && 'str-chat__channel-search-result--focused focused');
    if (isChannel(result)) {
        var channel_1 = result;
        return themeVersion === '2' ? (React.createElement(ChannelPreview, { channel: channel_1, className: className, onSelect: function () { return selectResult(channel_1); } })) : (React.createElement("button", { "aria-label": "Select Channel: ".concat(((_a = channel_1.data) === null || _a === void 0 ? void 0 : _a.name) || ''), className: className, "data-testid": 'channel-search-result-channel', onClick: function () { return selectResult(channel_1); }, role: 'option' },
            React.createElement("div", { className: 'result-hashtag' }, "#"),
            React.createElement("p", { className: 'channel-search__result-text' }, (_b = channel_1.data) === null || _b === void 0 ? void 0 : _b.name)));
    }
    else {
        return (React.createElement("button", { "aria-label": "Select User Channel: ".concat(result.name || ''), className: className, "data-testid": 'channel-search-result-user', onClick: function () { return selectResult(result); }, role: 'option' },
            React.createElement(Avatar, { image: result.image, name: result.name || result.id, size: themeVersion === '2' ? 40 : undefined, user: result }),
            React.createElement("div", { className: 'str-chat__channel-search-result--display-name' }, result.name || result.id)));
    }
};
var ResultsContainer = function (_a) {
    var children = _a.children, popupResults = _a.popupResults;
    return (React.createElement("div", { "aria-label": 'Channel search results', className: clsx("str-chat__channel-search-container str-chat__channel-search-result-list", popupResults ? 'popup' : 'inline') }, children));
};
export var SearchResults = function (props) {
    var popupResults = props.popupResults, results = props.results, searching = props.searching, _a = props.SearchEmpty, SearchEmpty = _a === void 0 ? DefaultSearchEmpty : _a, _b = props.SearchResultsHeader, SearchResultsHeader = _b === void 0 ? DefaultSearchResultsHeader : _b, SearchLoading = props.SearchLoading, _c = props.SearchResultItem, SearchResultItem = _c === void 0 ? DefaultSearchResultItem : _c, _d = props.SearchResultsList, SearchResultsList = _d === void 0 ? DefaultSearchResultsList : _d, selectResult = props.selectResult;
    var t = useTranslationContext('SearchResults').t;
    var _e = useState(), focusedResult = _e[0], setFocusedResult = _e[1];
    var handleKeyDown = useCallback(function (event) {
        if (event.key === 'ArrowUp') {
            setFocusedResult(function (prevFocused) {
                if (prevFocused === undefined)
                    return 0;
                return prevFocused === 0 ? results.length - 1 : prevFocused - 1;
            });
        }
        if (event.key === 'ArrowDown') {
            setFocusedResult(function (prevFocused) {
                if (prevFocused === undefined)
                    return 0;
                return prevFocused === results.length - 1 ? 0 : prevFocused + 1;
            });
        }
        if (event.key === 'Enter') {
            event.preventDefault();
            if (focusedResult !== undefined) {
                selectResult(results[focusedResult]);
                return setFocusedResult(undefined);
            }
        }
    }, [focusedResult]);
    useEffect(function () {
        document.addEventListener('keydown', handleKeyDown, false);
        return function () { return document.removeEventListener('keydown', handleKeyDown); };
    }, [handleKeyDown]);
    if (searching) {
        return (React.createElement(ResultsContainer, { popupResults: popupResults }, SearchLoading ? (React.createElement(SearchLoading, null)) : (React.createElement("div", { className: 'str-chat__channel-search-container-searching', "data-testid": 'search-in-progress-indicator' }, t('Searching...')))));
    }
    if (!results.length) {
        return (React.createElement(ResultsContainer, { popupResults: popupResults },
            React.createElement(SearchEmpty, null)));
    }
    return (React.createElement(ResultsContainer, { popupResults: popupResults },
        React.createElement(SearchResultsHeader, { results: results }),
        React.createElement(SearchResultsList, { focusedUser: focusedResult, results: results, SearchResultItem: SearchResultItem, selectResult: selectResult })));
};
