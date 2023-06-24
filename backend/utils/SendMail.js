const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
)

OAuth2_client.setCredentials({
    refresh_token:
        process.env.REFRESH_TOKEN
})


const sendMail = async (options) => {
    const accessToken = OAuth2_client.getAccessToken();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: "OAuth2",
            user: process.env.USER,
            clientId:
                process.env.CLIENT_ID,
            clientSecret:
                process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken
        }
    })



    const mailOptions = {
        from: `Eshops ${process.env.USER}`,
        to: options.recipient,
        subject: options.subject,
        text: options.message,
    };


    await transporter.sendMail(mailOptions);
}



module.exports = sendMail;