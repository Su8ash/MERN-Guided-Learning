const express = require("express");
const path = require("path");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncErrors");
const router = express.Router();
const User = require("../model/user");
const fs = require("fs");

const jwt = require("jsonwebtoken");
const sendMail = require("../utils/SendMail");
const sendToken = require("../utils/jwtToken");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const userEmail = await User.findOne({
            email
        });


        if (userEmail) {
            const filename = req.file.filename;
            const filePath = `uploads/${filename}`;

            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ message: "Error deleting file" });
                }

                next(new ErrorHandler("User already exists", 400));
            });

        }

        const filename = req.file.filename;
        const fileUrl = path.join(filename);

        const user = {
            name: name,
            email: email,
            password: password,
            avatar: fileUrl
        }


        const activationToken = createActivationToken(user);

        const activationUrl = `http://localhost:3000/activation/${activationToken}`;

        try {
            await sendMail({
                recipient: user.email,
                subject: "Activate Your Account",
                message: `Hello ${user.name}, Please click on the link to Active your account ${activationUrl}`
            })

            res.status(201).json({
                success: true,
                message: `Please check your mail to activate your account`
            })
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }

    // console.log(`User: ${user}`);
})



// create activation token
const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    });
};

// to activate user
router.post("/activation", catchAsyncError(async (req, res, next) => {
    console.log("Is it obvious");
    try {
        const { activation_token } = req.body;
        const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

        if (!newUser) {
            return next(new ErrorHandler("Inavlid Token", 400));
        }


        const { name, email, password, avatar } = newUser;

        let user = await User.findOne({ email });

        if (user) {
            return next(new ErrorHandler("User already Activated", 500))
        }


        // lets check user again

        user = await User.create({
            name,
            email,
            avatar,
            password,
        });

        sendToken(user, 201, res);

    } catch (error) {

        return next(new ErrorHandler(error.message, 500));
    }
}))


module.exports = router;