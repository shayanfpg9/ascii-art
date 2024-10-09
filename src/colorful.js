const sharp = require("sharp");
const { join } = require("path");
const log = require("./response");
const { rgbToAnsi } = require("./color");

// Function to get the appropriate ASCII character based on brightness
function getAsciiChar(brightness) {
    const index = Math.floor((brightness / 255) * (asciiCharacters.length - 1));
    return asciiCharacters[index];
}

async function colorful(fileName, grayscale = false, width = 100) {
    try {
        const path = join(__dirname, "../temp", fileName)
        let image = sharp(path);
        const metadata = await image.metadata();

        if (grayscale) {
            image = await sharp(path).grayscale()
        }

        // Calculate the height based on the aspect ratio and correct for terminal character proportions (~2:1)
        const aspectRatio = metadata.width / metadata.height;
        const height = Math.round(width / aspectRatio / 2);

        // Process the image: resize it, and get the raw RGB data
        const { data, info } = await image
            .resize({ width, height })
            .raw()
            .toBuffer({ resolveWithObject: true });

        let asciiArt = '';

        // Loop through the pixel data and convert each pixel to ASCII
        for (let y = 0; y < info.height; y++) {
            let row = '';
            for (let x = 0; x < info.width; x++) {
                const idx = (info.width * y + x) * info.channels;  // Calculate the index for each pixel

                if (grayscale) {
                    const brightness = data[idx]; // Get grayscale brightness (0-255)

                    // Map brightness to an ASCII character
                    const asciiIndex = Math.floor((brightness / 255) * (asciiCharacters.length - 1));
                    row += asciiCharacters[asciiIndex];
                } else {
                    // Extract RGB values
                    const r = data[idx];
                    const g = data[idx + 1];
                    const b = data[idx + 2];

                    // Calculate brightness (grayscale equivalent)
                    const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;

                    // Get the corresponding ASCII character based on brightness
                    const asciiChar = getAsciiChar(brightness);

                    // Add the ANSI color code and the ASCII character to the row
                    row += `${rgbToAnsi(r, g, b)}${asciiChar}\x1b[0m`;  // Reset color after each character
                }
            }
            asciiArt += row + '\n';
        }

        return asciiArt;

    } catch (error) {
        log.error(error)
    }
}

module.exports = colorful