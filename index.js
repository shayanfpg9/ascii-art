const inquirer = require('inquirer');
const { normal, success } = require('./src/response.js');
const colorful = require('./src/colorful.js');
const save = require('./src/save.js');

async function init() {
    const firstQuestion = [
        {
            type: 'list',
            name: 'inputType',
            message: 'Do you want to make an art from an image or text?',
            choices: ['image', 'text'],
        }
    ];

    const { inputType } = await inquirer.prompt(firstQuestion);

    const { AsciiCharList } = await inquirer.prompt([
        {
            type: 'input',
            name: 'AsciiCharList',
            default: "0123456789",
            message: 'What is your custom character list?',
        }
    ]);

    let questions = [];

    if (inputType === 'image') {
        // Questions for image
        questions = [
            {
                type: 'list',
                name: 'colorType',
                message: 'Choose the color type:',
                choices: ["colorful", 'grayscale'],
            },
            {
                type: 'input',
                name: 'fileUrl',
                message: 'Please provide the file name:',
                validate: (input) => (input ? true : 'File URL cannot be empty.'),
            },
            {
                type: 'input',
                name: 'imageWidth',
                default: 100,
                message: 'Enter the image width in pixels:',
                validate: (input) => {
                    const num = parseInt(input);
                    return !isNaN(num) && num > 0 ? true : 'Width must be a positive number.';
                },
            },
        ];
    } else {
        // Questions for text
        questions = [
            {
                type: 'input',
                name: 'text',
                message: 'Please enter the text:',
                validate: (input) => (input ? true : 'Text cannot be empty.'),
            },
            {
                type: 'input',
                name: 'fontName',
                message: 'Please enter the font name:',
                validate: (input) => (input ? true : 'Font name cannot be empty.'),
            },
            {
                type: 'input',
                name: 'textColor',
                message: 'Enter the text color in hex format:',
                default: "#FF5733",
                validate: (input) => /^#[0-9A-F]{6}$/i.test(input) ? true : 'Please enter a valid hex color code.',
            },
            {
                type: 'confirm',
                name: 'needShade',
                message: 'Do you need shade?',
                default: false,
            },
        ];
    }

    // Ask the selected questions
    const answers = await inquirer.prompt(questions);

    // Ask if the user wants to save the result
    const saveQuestion = [
        {
            type: 'confirm',
            name: 'saveAsTxt',
            message: 'Do you need to save the output as a text file?',
            default: false,
        },
    ];

    const saveAnswer = await inquirer.prompt(saveQuestion);

    // Final output
    success('\nSummary of your inputs:');
    normal({ inputType, AsciiCharList, ...answers, ...saveAnswer });

    global.asciiCharacters = AsciiCharList

    let data = ""

    if (inputType == "image") {
        data = await colorful(answers.fileUrl, answers.colorType === "grayscale" , answers.imageWidth)
    }

    normal(data)

    if (saveAnswer.saveAsText) {
        save(data)
    }
}

init();
