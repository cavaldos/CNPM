import { useCallback, useState } from 'react';
export var useEnterLeaveHandlers = function (_a) {
    var _b = _a === void 0 ? {} : _a, onMouseEnter = _b.onMouseEnter, onMouseLeave = _b.onMouseLeave;
    var _c = useState(false), tooltipVisible = _c[0], setTooltipVisible = _c[1];
    var handleEnter = useCallback(function (e) {
        setTooltipVisible(true);
        onMouseEnter === null || onMouseEnter === void 0 ? void 0 : onMouseEnter(e);
    }, [onMouseEnter]);
    var handleLeave = useCallback(function (e) {
        setTooltipVisible(false);
        onMouseLeave === null || onMouseLeave === void 0 ? void 0 : onMouseLeave(e);
    }, [onMouseLeave]);
    return { handleEnter: handleEnter, handleLeave: handleLeave, tooltipVisible: tooltipVisible };
};
