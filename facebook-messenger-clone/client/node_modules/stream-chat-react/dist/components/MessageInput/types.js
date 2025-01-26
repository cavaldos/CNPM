export var LinkPreviewState;
(function (LinkPreviewState) {
    /** Link preview has been dismissed using MessageInputContextValue.dismissLinkPreview **/
    LinkPreviewState["DISMISSED"] = "dismissed";
    /** Link preview could not be loaded, the enrichment request has failed. **/
    LinkPreviewState["FAILED"] = "failed";
    /** Link preview has been successfully loaded. **/
    LinkPreviewState["LOADED"] = "loaded";
    /** The enrichment query is in progress for a given link. **/
    LinkPreviewState["LOADING"] = "loading";
    /** The link is scheduled for enrichment. **/
    LinkPreviewState["QUEUED"] = "queued";
})(LinkPreviewState || (LinkPreviewState = {}));
export var SetLinkPreviewMode;
(function (SetLinkPreviewMode) {
    SetLinkPreviewMode[SetLinkPreviewMode["UPSERT"] = 0] = "UPSERT";
    SetLinkPreviewMode[SetLinkPreviewMode["SET"] = 1] = "SET";
    SetLinkPreviewMode[SetLinkPreviewMode["REMOVE"] = 2] = "REMOVE";
})(SetLinkPreviewMode || (SetLinkPreviewMode = {}));
