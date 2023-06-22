const express = require("express");
const path = require("path");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const router = express.Router();

router.post("/create-user", upload.single("file"), async (req, res) => {
    const { name, email, password } = req.body;

    const userEmail = await User.findOne({
        email
    });


    if (userEmail) {
        return next(new ErrorHandler("User already Exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const user = {
        name: name,
        email: email,
        password: password,
        avatar: fileUrl
    }

    console.log(`User: ${user}`);
})


module.exports = router;