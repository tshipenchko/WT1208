# Project Name

This project is a full-featured web application that allows users to manage their portfolios. It provides a user-friendly interface for creating, reading, updating, and deleting portfolio items. The application also includes an alert system and sends emails to users for specific actions.

## Features

- **Full User Management**: The application provides full user management capabilities, including registration, login, and profile management.
- **Portfolio CRUD**: Users can create, read, update, and delete portfolio items. Each portfolio item includes a title, description, and image.
- **Alerts**: The application includes an alert system that notifies users of specific events within the application.
- **Email Notifications**: The application sends emails to users for specific actions, such as registration confirmation, password reset, and portfolio item creation.

## Tech Features

The application is built using the following technologies:

- **Express**: A fast, unopinionated, and minimalist web framework for Node.js.
- **MongoDB**: A source-available cross-platform document-oriented database program.
- **Docker**: An open platform for developing, shipping, and running applications.
- **Mongoose ODM**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **Bootstrap**: A free and open-source CSS framework directed at responsive, mobile-first front-end web development.
- **Admin Panel**: A user-friendly interface for managing the application.

## Admin Panel

The admin panel is a user-friendly interface for managing the application. It provides the following features:
- **User Management**: Admins can view, promote, demote and delete users.
- **Portfolio Management**: Admins can view, approve, and delete portfolio items.

To get access to the admin panel, update any account's role to `admin` in the database.
Then visit the `/admin/` route to access the admin panel.

## Used REST APIs

The application uses several REST APIs to provide its functionality. These APIs are used in various pages throughout the application.

- **Random User API**: Used for user registration. Provides random user data for testing purposes.
- **Random Image API**: Used for generating random images for portfolio items.
- **Random Text API**: Used for generating random descriptions for portfolio items.

## Emailing Service

The application uses the `nodemailer` library to send emails to users. The email service is configured to use a Yandex account for sending emails.

Currently, the application sends emails for the following actions:
- **Registration**: Sends a welcome email to the user after registration.
- **Any admin action**: Sends an email to the user when an admin performs an action on their portfolio items.
- **Delete account**: Sends an email to the user when their account is deleted.

## Environment Variables
Here's a brief explanation of each variable:  
- `MONGODB_URI`: This is the connection string for MongoDB. It's pointing to a MongoDB instance running on localhost on the default port 27017.  
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`: These are configuration variables for an SMTP server. The application is likely using this server to send emails. The host is set to smtp.yandex.ru, the port is set to 465 (which is the standard port for SMTPS), and SMTP_SECURE is set to true, indicating that the connection should be secure.  
- `EMAIL` and `PASSWORD`: These are likely the credentials used to authenticate with the SMTP server.  
Also other variables that can be used to configure the application, such as the port the application should listen on, the secret used to crypt sessions, password hashing salt and rounds, etc.

## Development

To set up the project for development, follow these steps:

1. Clone the repository to your local machine.
2. Install Docker and Docker Compose if you haven't already.
3. Run `docker-compose up` in the root directory of the project.
4. Alternatively, you can run the project using npm by running `npm clean-install` followed by `npm run dev`.

## Deployment

The application is currently deployed on `mypages.freemyip.com`. To deploy the application using Docker, follow these steps:

1. Build the Docker image by running `docker compose build` in the root directory of the project.
2. Run the Docker image by running `docker compose up -d`.

Currently, the project is deployed on [mypages.freemyip.com](https://mypages.freemyip.com).