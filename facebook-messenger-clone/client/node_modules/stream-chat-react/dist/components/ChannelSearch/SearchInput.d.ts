import React from 'react';
export declare type SearchInputController = {
    /** Clears the channel search state */
    clearState: () => void;
    inputRef: React.RefObject<HTMLInputElement>;
    /** Search input change handler */
    onSearch: React.ChangeEventHandler<HTMLInputElement>;
    /** Current search string */
    query: string;
};
export declare type AdditionalSearchInputProps = {
    /** Sets the input element into disabled state */
    disabled?: boolean;
    /** Custom placeholder text to be displayed in the search input */
    placeholder?: string;
};
export declare type SearchInputProps = AdditionalSearchInputProps & SearchInputController;
export declare const SearchInput: (props: SearchInputProps) => JSX.Element;
//# sourceMappingURL=SearchInput.d.ts.map