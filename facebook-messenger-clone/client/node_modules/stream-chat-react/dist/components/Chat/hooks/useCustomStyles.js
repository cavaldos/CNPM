export var darkModeTheme = {
    '--bg-gradient-end': '#101214',
    '--bg-gradient-start': '#070a0d',
    '--black': '#ffffff',
    '--blue-alice': '#00193d',
    '--border': '#141924',
    '--button-background': '#ffffff',
    '--button-text': '#005fff',
    '--grey': '#7a7a7a',
    '--grey-gainsboro': '#2d2f2f',
    '--grey-whisper': '#1c1e22',
    '--modal-shadow': '#000000',
    '--overlay': '#00000066',
    '--overlay-dark': '#ffffffcc',
    '--shadow-icon': '#00000080',
    '--targetedMessageBackground': '#302d22',
    '--transparent': 'transparent',
    '--white': '#101418',
    '--white-smoke': '#13151b',
    '--white-snow': '#070a0d',
};
/**
 * @deprecated This hook has been deprecated in favor of the new
 * theming (V2) setup which sets its variables through CSS files.
 * Refer to the [documentation](https://getstream.io/chat/docs/sdk/react/theming/themingv2/) of the new theming for the upgrade.
 *
 * **Will be removed with the complete transition to the theming V2.**
 */
export var useCustomStyles = function (customStyles) {
    if (!customStyles)
        return;
    for (var _i = 0, _a = Object.entries(customStyles); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        document.documentElement.style.setProperty(key, value);
    }
};
