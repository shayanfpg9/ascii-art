const fs = require("fs")
const { error, success } = require("./response")
const path = require("path")


function save(data) {
    try {
        const filePath = path.join(__dirname, "../output", Date.now() + ".txt")

        const dirname = path.dirname(filePath);
        if (!fs.existsSync(dirname)) {
            fs.mkdirSync(dirname, { recursive: true });
        }

        fs.writeFileSync(filePath, data, { encoding: "utf-8" })

        success("File saved at " + filePath)
    } catch (errTxt) {
        error(errTxt)
    }
}

module.exports = save