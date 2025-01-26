export declare type CurrentTrigger<T extends string = string> = '/' | '@' | ':' | T;
export declare type SuggestionListHeaderProps = {
    currentTrigger: CurrentTrigger;
    value: string;
};
export declare const DefaultSuggestionListHeader: (props: SuggestionListHeaderProps) => JSX.Element | null;
//# sourceMappingURL=Header.d.ts.map