# 📌 To-Do List Backend (Node.js + Express + TypeScript)

![To-Do List Banner](https://user-images.githubusercontent.com/your-banner-image.gif)

🚀 A powerful **To-Do List Backend** built with **Node.js, Express.js, MongoDB, and TypeScript**. This project supports authentication, task management, and Twilio notifications.

---

## 📂 Tech Stack

![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Twilio](https://img.shields.io/badge/Twilio-F22F46?style=for-the-badge&logo=twilio&logoColor=white)

---

## ⚡ Features

✅ **User Authentication** (JWT-based)  
✅ **Create, Read, Update, Delete (CRUD) To-Do Tasks**  
✅ **Email Verification and Phone Verification(not working currently due to twilio issues but code included)
✅ **Secure Password Hashing with Bcrypt**  
✅ **Error Handling & Middleware Support**  
✅ **Express.js Router & Modular Codebase**  

---

## 🔧 Installation

```bash
# Clone the repository
git clone https://github.com/your-repo/todo-backend.git

# Navigate to the project folder
cd todo-backend

# Install dependencies
npm install
```

---

## ⚙️ Environment Variables

Create a `config` folder and inside it create a default.json file in the root directory and add the following:

```config
PORT=5000  e.g
MONGO_URI: your_mongodb_connection_string
JWT_SECRET: your_jwt_secret
TWILIO_ACCOUNT_SID: your_twilio_sid
TWILIO_AUTH_TOKEN: your_twilio_auth_token
URL: http://localhost:5000
```

---

## 🚀 Running the Project

```bash
# Start the server
npm run dev
```

The server will start at `http://localhost:5000` 🚀

---

## 🛠 API Endpoints

| Method | Endpoint      | Description            |
|--------|--------------|------------------------|
| POST   | /api/auth/usersignup | Register a new user |
| POST   | /api/auth/usersignin    | User login          |
| GET    | /api/todos         | Get all tasks       |
| POST   | /api/todos         | Create a new task   |
| PUT    | /api/todos/:id     | Update a task       |
| DELETE | /api/todos/:id     | Delete a task       |

---

## 🌟 Contributions

Feel free to **fork** this repo, submit PRs, and make this project even better! 💡🚀

---

Thanks for checking it out🙌

