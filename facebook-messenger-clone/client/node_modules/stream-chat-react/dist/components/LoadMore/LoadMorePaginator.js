import React, { useEffect } from 'react';
import { LoadMoreButton as DefaultLoadMoreButton } from './LoadMoreButton';
import { deprecationAndReplacementWarning } from '../../utils/deprecationWarning';
export var UnMemoizedLoadMorePaginator = function (props) {
    var children = props.children, hasNextPage = props.hasNextPage, isLoading = props.isLoading, _a = props.LoadMoreButton, LoadMoreButton = _a === void 0 ? DefaultLoadMoreButton : _a, loadNextPage = props.loadNextPage, refreshing = props.refreshing, reverse = props.reverse;
    var loadingState = typeof isLoading !== 'undefined' ? isLoading : refreshing;
    useEffect(function () {
        deprecationAndReplacementWarning([[{ refreshing: refreshing }, { isLoading: isLoading }]], 'LoadMorePaginator');
    }, []);
    return (React.createElement(React.Fragment, null,
        !reverse && children,
        hasNextPage && React.createElement(LoadMoreButton, { isLoading: loadingState, onClick: loadNextPage }),
        reverse && children));
};
export var LoadMorePaginator = React.memo(UnMemoizedLoadMorePaginator);
