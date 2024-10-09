/* eslint no-console: 0 */

const colorName = {
    red: "#FF0000",
    green: "#00FF00",
    blue: "#0000FF",
    yellow: "#FFFF00",
    cyan: "#00FFFF",
    magenta: "#FF00FF",
    black: "#000000",
    white: "#FFFFFF",
    gray: "#808080",
    lightGray: "#D3D3D3",
    darkGray: "#A9A9A9",
    orange: "#FFA500",
    purple: "#800080",
    pink: "#FFC0CB",
    brown: "#A52A2A",
    teal: "#008080",
    lime: "#00FF00",
    navy: "#000080",
    olive: "#808000",
    silver: "#C0C0C0",
};

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    return { r, g, b };
}

function rgbToAnsi(r, g, b) {
    return `\x1b[38;2;${r};${g};${b}m`;
}

function nameToRgb(name) {
    return hexToRgb(colorName[name]);
}

function log(text, color) {
    if (color) {
        const { r, g, b } = color;
        const ansiColor = rgbToAnsi(r, g, b);
        console.log(`${ansiColor}${text}\x1b[0m`);
    } else {
        console.log(text);
    }
}

module.exports = {
    log,
    hex: hexToRgb,
    name: nameToRgb,
    rgbToAnsi
};
