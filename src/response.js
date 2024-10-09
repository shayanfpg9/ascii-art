const { log, name } = require("./color");

const success = (text) => {
    log(text, name("green"))
}

const warning = (text) => {
    log(text, name("yellow"))
}

const info = (text) => {
    log(text, name("cyan"))
}

const error = (text) => {
    log("ERROR: " + text, name("red"))
}

module.exports = {
    normal: log, success, warning, info, error
}