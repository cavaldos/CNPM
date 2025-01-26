import type { Channel } from 'stream-chat';
import type { DefaultStreamChatGenerics } from '../../../types/types';
export declare type ChannelPreviewInfoParams<StreamChatGenerics extends DefaultStreamChatGenerics> = {
    channel: Channel<StreamChatGenerics>;
    /** Manually set the image to render, defaults to the Channel image */
    overrideImage?: string;
    /** Set title manually */
    overrideTitle?: string;
};
export declare const useChannelPreviewInfo: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: ChannelPreviewInfoParams<StreamChatGenerics>) => {
    displayImage: string | undefined;
    displayTitle: string | undefined;
};
//# sourceMappingURL=useChannelPreviewInfo.d.ts.map