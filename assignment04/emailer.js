const nodemailer = require("nodemailer");
const { requireEnv } = require("./utils");

const transporter = nodemailer.createTransport({
    host: requireEnv("SMTP_HOST"),
    port: requireEnv("SMTP_PORT", 587),
    secure: requireEnv("SMTP_SECURE", "false") !== "false",
    auth: {
        user: requireEnv("EMAIL"),
        pass: requireEnv("PASSWORD"),
    },
});


module.exports = {
    sendEmail(to, subject, html) {
        let mailOptions = {
            from: requireEnv("EMAIL"),
            html: html,
            ...{ to, subject },
        };

        transporter.sendMail(mailOptions).then(r => {
            console.log("Email sent: " + r.response);
        }).catch(e => {
            console.error(e);
        });
    },
};
