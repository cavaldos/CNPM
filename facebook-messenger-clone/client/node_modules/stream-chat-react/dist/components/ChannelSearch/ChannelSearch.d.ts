import React from 'react';
import { ChannelSearchControllerParams } from './hooks/useChannelSearch';
import { AdditionalSearchInputProps, SearchInputProps } from './SearchInput';
import { AdditionalSearchResultsProps } from './SearchResults';
import type { DefaultStreamChatGenerics } from '../../types/types';
import type { AdditionalSearchBarProps, SearchBarProps } from './SearchBar';
export declare type AdditionalChannelSearchProps = {
    /** Custom UI component to display the search bar with text input */
    SearchBar?: React.ComponentType<SearchBarProps>;
    /** Custom UI component to display the search text input */
    SearchInput?: React.ComponentType<SearchInputProps>;
};
export declare type ChannelSearchProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = AdditionalSearchBarProps & AdditionalSearchInputProps & AdditionalSearchResultsProps<StreamChatGenerics> & AdditionalChannelSearchProps & ChannelSearchControllerParams<StreamChatGenerics>;
/**
 * The ChannelSearch component makes a query users call and displays the results in a list.
 * Clicking on a list item will navigate you into a channel with the selected user. It can be used
 * on its own or added to the ChannelList component by setting the `showChannelSearch` prop to true.
 */
export declare const ChannelSearch: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: ChannelSearchProps<StreamChatGenerics>) => JSX.Element;
//# sourceMappingURL=ChannelSearch.d.ts.map