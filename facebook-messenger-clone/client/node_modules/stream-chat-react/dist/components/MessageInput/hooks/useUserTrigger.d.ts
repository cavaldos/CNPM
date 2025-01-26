import type { UserResponse } from 'stream-chat';
import type { SearchQueryParams } from '../../ChannelSearch/hooks/useChannelSearch';
import type { UserTriggerSetting } from '../../MessageInput/DefaultTriggerProvider';
import type { DefaultStreamChatGenerics } from '../../../types/types';
export declare type UserTriggerParams<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    onSelectUser: (item: UserResponse<StreamChatGenerics>) => void;
    disableMentions?: boolean;
    mentionAllAppUsers?: boolean;
    mentionQueryParams?: SearchQueryParams<StreamChatGenerics>['userFilters'];
    useMentionsTransliteration?: boolean;
};
export declare const useUserTrigger: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(params: UserTriggerParams<StreamChatGenerics>) => UserTriggerSetting<StreamChatGenerics>;
//# sourceMappingURL=useUserTrigger.d.ts.map