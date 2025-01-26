import React, { PropsWithChildren, ReactNode } from 'react';
import type { ATTACHMENT_GROUPS_ORDER } from './Attachment';
import type { Attachment } from 'stream-chat';
import type { AttachmentProps } from './Attachment';
import type { DefaultStreamChatGenerics } from '../../types/types';
export declare const SUPPORTED_VIDEO_FORMATS: string[];
export declare type AttachmentComponentType = typeof ATTACHMENT_GROUPS_ORDER[number];
export declare type GroupedRenderedAttachment = Record<AttachmentComponentType, ReactNode[]>;
export declare type GalleryAttachment<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    images: Attachment<StreamChatGenerics>[];
    type: 'gallery';
};
export declare type AttachmentContainerProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = {
    attachment: Attachment<StreamChatGenerics> | GalleryAttachment<StreamChatGenerics>;
    componentType: AttachmentComponentType;
};
export declare type RenderAttachmentProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = Omit<AttachmentProps<StreamChatGenerics>, 'attachments'> & {
    attachment: Attachment<StreamChatGenerics>;
};
export declare type RenderGalleryProps<StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics> = Omit<AttachmentProps<StreamChatGenerics>, 'attachments'> & {
    attachment: GalleryAttachment<StreamChatGenerics>;
};
export declare const isScrapedContent: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(attachment: Attachment<StreamChatGenerics>) => string | undefined;
export declare const isUploadedImage: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(attachment: Attachment<StreamChatGenerics>) => boolean;
export declare const isGalleryAttachmentType: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(output: Attachment<StreamChatGenerics> | GalleryAttachment<StreamChatGenerics>) => output is GalleryAttachment<StreamChatGenerics>;
export declare const isAudioAttachment: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(attachment: Attachment<StreamChatGenerics>) => boolean;
export declare const isFileAttachment: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(attachment: Attachment<StreamChatGenerics>) => boolean | "" | undefined;
export declare const isMediaAttachment: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(attachment: Attachment<StreamChatGenerics>) => boolean;
export declare const isSvgAttachment: (attachment: Attachment) => boolean;
/**
 * @deprecated will be removed in the next major release,
 * replaced with the proper component equivalent `AttachmentContainer/AttachmentWithinContainer`
 */
export declare const renderAttachmentWithinContainer: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: React.PropsWithChildren<AttachmentContainerProps<StreamChatGenerics>>) => JSX.Element;
/**
 * @deprecated will be removed in the next major release,
 * replaced with the proper component equivalent `AttachmentContainer/AttachmentActionsContainer`
 */
export declare const renderAttachmentActions: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: RenderAttachmentProps<StreamChatGenerics>) => JSX.Element | null;
/**
 * @deprecated will be removed in the next major release,
 * replaced with the proper component equivalent `AttachmentContainer/GalleryContainer`
 */
export declare const renderGallery: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: RenderGalleryProps<StreamChatGenerics>) => JSX.Element;
/**
 * @deprecated will be removed in the next major release,
 * replaced with the proper component equivalent `AttachmentContainer/ImageContainer`
 */
export declare const renderImage: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: RenderAttachmentProps<StreamChatGenerics>) => JSX.Element;
/**
 * @deprecated will be removed in the next major release,
 * replaced with the proper component equivalent `AttachmentContainer/CardContainer`
 */
export declare const renderCard: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: RenderAttachmentProps<StreamChatGenerics>) => JSX.Element;
/**
 * @deprecated will be removed in the next major release,
 * replaced with the proper component equivalent `AttachmentContainer/FileContainer`
 */
export declare const renderFile: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: RenderAttachmentProps<StreamChatGenerics>) => JSX.Element | null;
/**
 * @deprecated will be removed in the next major release,
 * replaced with the proper component equivalent `AttachmentContainer/AudioContainer`
 */
export declare const renderAudio: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: RenderAttachmentProps<StreamChatGenerics>) => JSX.Element;
/**
 * @deprecated will be removed in the next major release,
 * replaced with the proper component equivalent `AttachmentContainer/MediaContainer`
 */
export declare const renderMedia: <StreamChatGenerics extends DefaultStreamChatGenerics = DefaultStreamChatGenerics>(props: RenderAttachmentProps<StreamChatGenerics>) => JSX.Element;
//# sourceMappingURL=utils.d.ts.map