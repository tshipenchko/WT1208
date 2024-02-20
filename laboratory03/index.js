require("dotenv").config();
const nodemailer = require("nodemailer");

const requireEnv = (name, defaultValue) => {
    // This function returns value from environment variable or default value
    // If the environment variable is missing and no default value is given,
    // the program will exit with an error message.
    if (!process.env[name] && !defaultValue) {
        console.error(`Environment variable ${name} is missing.`);
        process.exit(1);
    } else {
        return process.env[name] || defaultValue;
    }
};

let transporter = nodemailer.createTransport({
    host: requireEnv("SMTP_HOST"),
    port: requireEnv("SMTP_PORT", 587),
    secure: requireEnv("SMTP_SECURE", "false") !== "false",
    auth: {
        user: requireEnv("EMAIL"),
        pass: requireEnv("PASSWORD"),
    },
});

function sendEmail(to, subject, text) {
    // Main function for sending email
    let mailOptions = {
        from: process.env.EMAIL,
        html: `<p>${text}<p>\n<small>This is a test email from Nodemailer.</small>`,
        ...{ to, subject },
    };

    transporter.sendMail(mailOptions).then(r => {
        console.log("Email sent: " + r.response);
    }).catch(e => {
        console.error(e);
    });
}

// Basic input is given through command line arguments
let recipient = process.argv[2];
let subject = process.argv[3];
let text = process.argv[4];

if (!recipient || !subject || !text) {
    console.log("Usage: node index.js <recipient> <subject> <text>");
    process.exit(1);
} else {
    console.log("Sending email...");
    sendEmail(recipient, subject, text);
}
