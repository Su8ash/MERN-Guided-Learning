const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error"


    // Wrong MongoDB id Error
    if (err.name === "CastError") {
        const message = `Resources Not Found with this id. Invalid ${err.path}`
        err = new ErrorHandler(message, 400)
    }


    // Duplicate Key Error
    if (err.code === 11000) {
        const message = `Duplicate Key ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message, 400);
    }

    // Wrong jwt error
    if (err.name === "JsonWebTokenError") {
        const message = "Invalid Url (user) try again";
        err = new ErrorHandler(message, 400);
    }

    if (err.name === "TokenExpiredError") {
        const message = "Your Url is Expired, Please try again";
        err = new ErrorHandler(message, 400);
    }

}

