Frontend for Razorpay Integration with Google Calendar

This is the frontend application that integrates Razorpay for payment processing and Google Calendar authentication. The application is built using React and Vite, and environment variables like VITE_CLIENT_ID and VITE_RAZORPAY_KEY_ID are securely handled using .env files.


The backend of the application can be found on

```
https://github.com/hackman01/calendar
```

Features

    Razorpay Payment Gateway Integration
    Google Calendar Authentication
    Clean and responsive UI with TailwindCSS
    Easy handling of environment variables with Vite

Prerequisites

Make sure you have the following installed before setting up the project:

    Node.js (v14 or higher)
    npm or yarn (npm is recommended)
    Vite (automatically installed via npm install)

Installation Instructions


First, clone the repository to your local machine:

```
git clone https://github.com/hackman01/calendar-frontend

cd calendar-frontend
```
Install Dependencies

Run the following command to install all the required dependencies:
```
npm install
```
This will install all dependencies listed in your package.json file.

Set Up Environment Variables

You need to set up the environment variables for Razorpay and Google Client ID by creating a .env file in the root directory of the project.

Create a file named .env and add the following:

```
VITE_CLIENT_ID=your_google_client_id
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

Note:

    Replace your_google_client_id with your actual Google Client ID (for Google Calendar OAuth2).
    Replace your_razorpay_key_id with your actual Razorpay Key ID.

Ensure that your .env file is never committed to version control to keep your keys secure. You can add .env to your .gitignore file:


Run the Application

Now, you can run the development server using:

```
npm run dev
```

This will start the Vite development server, and you can access the application at http://localhost:5173.

Usage

Once the app is running, you can:

```
1. Go the ```/influencer``` in order to sign in as inluencer and give access to your calendar.
2. Now you can go to the ```/register``` or ```/``` in order to create a user or login.
3. Now you can create the events and pay using razorpay.

```



