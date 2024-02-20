# Laboratory03
This is a simple Node.js application that uses Nodemailer to send emails. It allows users to input email details through the command line. It also uses dotenv to move all secret info into the `.env` file.

## Installation
1. Get the sources.
2. Install the dependencies:
```bash
npm clean-install
```

## Configuration
Create a `.env` file in the root of your project and add your email and password:
```env
SMTP_HOST=smtp.yandex.ru
SMTP_PORT=465
SMTP_SECURE=true
EMAIL=youremail@yandex.ru
PASSWORD=yourpassword
```

## Usage
To run the application, use the following command:
```bash
node index.js <recipient> <subject> <text>
```
Replace `<recipient>`, `<subject>`, and `<text>` with the recipient's email, the subject, and the text of the email respectively.
<br/>
Also you can use the following script to run the application:
```bash
./test.sh
```
It will email to developer's email with Kira Yoshikage's quote.

## Watermark
The application includes a watermark in the email text.

## How It Works
The application uses the Nodemailer package to send emails. 
It creates a transporter object using the email and password specified in the `.env` file. 
The recipient, subject, and text of the email are taken from the command line arguments. 
If any of these arguments are missing, the application will print a usage message and exit. 
The application also includes error handling. 
If an error occurs while sending the email, it will be caught and logged to the console.
