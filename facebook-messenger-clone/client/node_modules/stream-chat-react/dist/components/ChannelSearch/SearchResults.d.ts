import React from 'react';
import { ChannelOrUserResponse } from './utils';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare type SearchResultsHeaderProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = Pick<SearchResultsProps<StreamChatGenerics>, 'results'>;
export declare type SearchResultsListProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = Pick<SearchResultsProps<StreamChatGenerics>, 'results' | 'SearchResultItem' | 'selectResult'> & {
    focusedUser?: number;
};
export declare type SearchResultItemProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = Pick<SearchResultsProps<StreamChatGenerics>, 'selectResult'> & {
    index: number;
    result: ChannelOrUserResponse<StreamChatGenerics>;
    focusedUser?: number;
};
export declare type SearchResultsController<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    results: Array<ChannelOrUserResponse<StreamChatGenerics>> | [];
    searching: boolean;
    selectResult: (result: ChannelOrUserResponse<StreamChatGenerics>) => Promise<void> | void;
};
export declare type AdditionalSearchResultsProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    /** Display search results as an absolutely positioned popup, defaults to false and shows inline */
    popupResults?: boolean;
    /** Custom UI component to display empty search results */
    SearchEmpty?: React.ComponentType;
    /** Custom UI component to display the search loading state */
    SearchLoading?: React.ComponentType;
    /** Custom UI component to display a search result list item, defaults to and accepts the same props as: [DefaultSearchResultItem](https://github.com/GetStream/stream-chat-react/blob/master/src/components/ChannelSearch/SearchResults.tsx) */
    SearchResultItem?: React.ComponentType<SearchResultItemProps<StreamChatGenerics>>;
    /** Custom UI component to display the search results header */
    SearchResultsHeader?: React.ComponentType;
    /** Custom UI component to display all the search results, defaults to and accepts the same props as: [DefaultSearchResultsList](https://github.com/GetStream/stream-chat-react/blob/master/src/components/ChannelSearch/SearchResults.tsx)  */
    SearchResultsList?: React.ComponentType<SearchResultsListProps<StreamChatGenerics>>;
};
export declare type SearchResultsProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = AdditionalSearchResultsProps<StreamChatGenerics> & SearchResultsController<StreamChatGenerics>;
export declare const SearchResults: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: SearchResultsProps<StreamChatGenerics>) => JSX.Element;
//# sourceMappingURL=SearchResults.d.ts.map