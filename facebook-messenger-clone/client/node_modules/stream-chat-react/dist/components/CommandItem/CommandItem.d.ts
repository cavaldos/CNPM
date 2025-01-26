import { PropsWithChildren } from 'react';
export declare type CommandItemProps = {
    entity: {
        /** Arguments of command */
        args?: string;
        /** Description of command */
        description?: string;
        /** Name of the command */
        name?: string;
    };
};
export declare const CommandItem: (props: PropsWithChildren<CommandItemProps>) => JSX.Element;
//# sourceMappingURL=CommandItem.d.ts.map