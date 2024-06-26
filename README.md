# PawPal

PawPal is a web platform for pet owners and institutions to connect, manage pet details, and facilitate pet adoption through user-friendly features like authentication, pet management, appointment scheduling, and journaling.

It is a web application developed as part of the CS546 course at Stevens Institute of Technology. It provides a platform for pet owners and pet institutions to interact, manage pet details, and facilitate pet adoption.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To set up and run PawPal, ensure you have the following dependencies installed:

- [Node.js](https://nodejs.org/): Required for running the server-side JavaScript environment.
- [MongoDB](https://www.mongodb.com/): Used as the database for storing application data.

Additionally, the following Node.js packages are required for the project:

- **bcrypt**: Used for hashing and securing passwords.
- **bcryptjs**: An alternative library for password hashing; used in case of compatibility issues with `bcrypt`.
- **express**: The primary framework for building web applications in Node.js.
- **express-handlebars**: A templating engine used to render views in Express.
- **express-session**: Enables session management, allowing you to maintain user sessions between HTTP requests.
- **mongodb**: Provides the MongoDB client for interacting with the MongoDB database.
- **@elasticemail/elasticemail-client**: Email client for sending emails.
- **@material/snackbar**: Material design snackbar for UI feedback.
- **axios**: HTTP client for making requests.
- **bootstrap**: Front-end framework for styling.
- **cors**: Middleware to enable Cross-Origin Resource Sharing.
- **fs**: Node.js file system module.
- **moment**: Library for handling dates and times.
- **multer**: Middleware for handling file uploads.
- **otp-generator**: Library for generating one-time passwords (OTPs).
- **sanitize-html**: Library for sanitizing HTML input.
- **xss**: Library for preventing Cross-Site Scripting (XSS) attacks.

Make sure these packages are installed as part of your setup process. You can use `npm install` to install all the required dependencies as defined in the project's `package.json`.

### Installation

1. Clone the repository: Use `git clone https://github.com/Akshat2634/PawPal.git` to clone the repository to your local machine.
2. Install dependencies: Navigate to the project directory and use `npm install` to install the necessary packages for the project.
3. Seed the database: Use `npm run seed` to seed.
4. Start the server: Use `npm start` to start the server.
5. The password for all users and institutions in the seed file is User@123
One Sample email for User  -  meghna123@gmail.com
One Sample email for Institution - institution1@gmail.com

## Usage

Once the server is running, navigate to `http://localhost:3000` in your web browser. You can login as a user or an institution, manage pets, and interact with other users or institutions.

## Features

- User Authentication: Users can securely register and login to their accounts using the login route.
- Institution Authentication: Institutions can securely register and login to their accounts.
- User Dashboard: Once logged in, users are redirected to their dashboard where they can view their pets and manage them.
- Institution Dashboard: Institutions have their own dashboard to manage their details.
- Pet Management: Users can add, update, and delete their pets' details.
- Institution Interaction: Users can interact with institutions for pet adoption.
- Appointment Scheduling: Users can schedule appointments with institutions.
- Post Creation: Users and institutions can create posts.
- Commenting: Users and institutions can comment on posts.
- Reviews: Users can leave reviews for institutions.
- Login Type Selection: Users can choose the type of login (user or institution) they want to proceed with.
- Session Management: The application maintains user sessions, ensuring a seamless user experience.
- Error Handling: The application handles errors effectively, ensuring that users are informed when an error occurs (e.g., error retrieving pets).
- Journaling: A digital scrapbook to capture a user's pets' memories and their daily activities, complete with personalized notes and optional photo uploads.
## Acknowledgments

- This project was developed as part of Group 39 of CS546 at Stevens Institute of Technology.
- We would like to thank our professor and TAs for their continuous support and guidance.

