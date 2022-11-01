const nodeMailer = require('nodemailer');

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SM_HOST,
        port: process.env.SM_PORT,
        service: process.env.SM_SERVICE,
        auth: {
            user: process.env.SM_EMAIL,
            pass: process.env.SM_PASSWORD,
        },
    });

    const mailOption = {
        from: process.env.SM_EMAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOption);
};

module.exports = sendEmail;
