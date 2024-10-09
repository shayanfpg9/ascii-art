/* eslint no-console: 0 */

const { log, hex: hexToRgb, name: nameToRgb } = require('../src/color');

describe('Color Utility Functions', () => {
    test('converts hex color to RGB', () => {
        expect(hexToRgb('#FF5733')).toEqual({ r: 255, g: 87, b: 51 });
        expect(hexToRgb('#00FF00')).toEqual({ r: 0, g: 255, b: 0 });
        expect(hexToRgb('#0000FF')).toEqual({ r: 0, g: 0, b: 255 });
        expect(hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
    });

    test('converts color name to RGB', () => {
        expect(nameToRgb('red')).toEqual({ r: 255, g: 0, b: 0 });
        expect(nameToRgb('green')).toEqual({ r: 0, g: 255, b: 0 });
        expect(nameToRgb('blue')).toEqual({ r: 0, g: 0, b: 255 });
    });

    describe('log', () => {
        test('logs text with color', () => {
            console.log = jest.fn(); // Mock console.log
            const text = 'Hello, World!';
            const color = { r: 255, g: 0, b: 0 };

            log(text, color);
            expect(console.log).toHaveBeenCalledWith(expect.stringContaining('\x1b[38;2;255;0;0mHello, World!\x1b[0m'));
        });

        test('logs text without color if no color is provided', () => {
            console.log = jest.fn(); // Mock console.log
            const text = 'Hello, World!';

            log(text);
            expect(console.log).toHaveBeenCalledWith(text);
        });
    });
});
