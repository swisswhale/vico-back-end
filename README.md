# The Visual Conversation App - Back-End

This is the back-end repository for **The Visual Conversation App**, an art collection and social platform that allows users to explore, save, and share artwork from museum APIs.

For full project details, including a live demo, screenshots, and planning materials, please visit the [The Visual Conversation App Front-End Repository](https://github.com/swisswhale/vico-front-end).

---

## Project Overview

The Visual Conversation App is a MERN-stack application that enables users to search for artworks via public museum APIs (currently Harvard Art Museums), build digital collections, and engage with other users through comments and ratings.

The back-end handles all API integrations, database management, user authentication, and RESTful routing for artworks, collections, auction records, and more.

---

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT Authentication**
- **Axios** (for external API requests)
- **dotenv** (for environment configuration)
- **bcrypt** (for secure password hashing)

---

## API Functionality

The back-end provides endpoints for:

- **User authentication** (sign up, login)
- **Artwork search and saving** (Harvard APIs)
- **Collections** (create, read, update, delete)
- **Comments and ratings** on artworks
- **Auction record management**

Routes are organized by controller in the `controllers/` directory.

---

## Project Structure
vico-back-end/

├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── tests/
├── .env
├── server.js
└── README.md

---

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/swisswhale/vico-back-end.git
   cd vico-back-end
   ```
2.	Install dependencies: 
    ```bash
    npm install
    ```

3.	Create a. `.env` file and add:<br/>
    ```bash
    MONGODB_URI=<your_mongo_uri>
    JWT_SECRET=<your_jwt_secret>
    HARVARD_API_KEY=<your_harvard_api_key>
    ```

4.	Run the server:
    ```bash
    nodemon server.js
    ```