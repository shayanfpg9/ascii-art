/* eslint no-console: 0 */

const colorName = {
    red: "#8B0000",        // Dark Red
    green: "#006400",      // Dark Green
    cyan: "#00FFFF",       // Cyan
    yellow: "#FFFF00",     // Yellow
    blue: "#0000FF",       // Blue
    orange: "#FFA500",     // Orange
    purple: "#800080",     // Purple
    pink: "#FFC0CB",       // Pink
    teal: "#008080",       // Teal
    gray: "#808080",       // Gray
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
