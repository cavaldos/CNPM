import React from 'react';
import prettybytes from 'pretty-bytes';
export var FileSizeIndicator = function (_a) {
    var fileSize = _a.fileSize;
    if (!(fileSize && Number.isFinite(Number(fileSize))))
        return null;
    return (React.createElement("span", { className: 'str-chat__message-attachment-file--item-size' }, prettybytes(fileSize)));
};
