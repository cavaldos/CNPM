export var deprecationAndReplacementWarning = function (pairs, component) {
    pairs.forEach(function (data) {
        var _a = [
            Object.entries(data[0])[0],
            Object.entries(data[1])[0],
        ], _b = _a[0], oldName = _b[0], oldValue = _b[1], _c = _a[1], newName = _c[0], newValue = _c[1];
        if ((typeof oldValue !== 'undefined' && typeof newValue === 'undefined') ||
            (typeof oldValue !== 'undefined' && typeof newValue !== 'undefined')) {
            console.warn("[Deprecation notice (".concat(component, ")]: prefer using prop ").concat(newName, " instead of ").concat(oldName));
        }
    });
};
