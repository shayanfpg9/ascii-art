global.asciiCharacters = "0123456789"

const sharp = require("sharp");
const { join } = require("path");
const log = require("../src/response");
const colorful = require("../src/colorful");
jest.mock("sharp");

describe('colorful function', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should process a colorful image correctly', async () => {
        const mockImageData = {
            data: Buffer.from([255, 0, 0, 0, 255, 0, 0, 0, 255]), // Mock RGB data
            info: {
                width: 3,
                height: 1,
                channels: 3,
            },
        };

        sharp.mockImplementation(() => ({
            metadata: jest.fn().mockResolvedValue({
                width: 3,
                height: 1,
            }),
            resize: jest.fn().mockReturnThis(),
            raw: jest.fn().mockReturnThis(),
            toBuffer: jest.fn().mockResolvedValue(mockImageData),
        }));

        const result = await colorful("test.png", false, 100);

        // Check if the function called the expected methods
        expect(sharp).toHaveBeenCalledWith(join(__dirname, "../temp", "test.png"));

        // Check the expected ASCII output
        expect(result).toContain('0'); // Adjust based on the ASCII mapping
        expect(result).toContain('1'); // Adjust based on the ASCII mapping
        expect(result).toContain('2'); // Adjust based on the ASCII mapping
    });

    it('should process a grayscale image correctly', async () => {
        const mockGrayscaleData = {
            data: Buffer.from([0, 128, 255]), // Mock grayscale data
            info: {
                width: 3,
                height: 1,
                channels: 1,
            },
        };

        sharp.mockImplementation(() => ({
            metadata: jest.fn().mockResolvedValue({
                width: 3,
                height: 1,
            }),
            grayscale: jest.fn().mockReturnThis(),
            resize: jest.fn().mockReturnThis(),
            raw: jest.fn().mockReturnThis(),
            toBuffer: jest.fn().mockResolvedValue(mockGrayscaleData),
        }));

        const result = await colorful("test.png", true, 100);

        // Check if the function called the expected methods
        expect(sharp).toHaveBeenCalledWith(join(__dirname, "../temp", "test.png"));


        // Check the expected ASCII output
        expect(result).toContain('0'); // Adjust based on the ASCII mapping
        expect(result).toContain('4'); // Adjust based on the ASCII mapping
    });

    it('should log error when processing fails', async () => {
        const consoleErrorSpy = jest.spyOn(log, 'error').mockImplementation(() => { });

        sharp.mockImplementation(() => {
            throw new Error("Mocked sharp error");
        });

        await colorful("test.png", false, 100);

        expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));

        consoleErrorSpy.mockRestore();
    });
});
