import { useMemo } from 'react';
export var useFileState = function (file) {
    return useMemo(function () { return ({
        failed: file.state === 'failed',
        finished: file.state === 'finished',
        uploading: file.state === 'uploading',
    }); }, [file.state]);
};
