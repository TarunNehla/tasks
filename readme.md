# Task Management App

A simple Task Management application built with a **React frontend** and a **Node.js + Express backend** with MongoDB for data storage.

Live Link : https://tasks-2e0q.onrender.com/

## Installation Guide

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v14+ recommended)
- [MongoDB](https://www.mongodb.com/atlas)
- npm

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/TarunNehla/tasks.git
cd tasks
```

## Running Backend & Frontend Together
By default, the backend serves the frontend from the **`dist`** folder. You can run the entire application by simply starting the backend.

### 2️⃣ Setup & Run Backend
```sh
cd backend
npm install
npm start
```
The backend will start on **http://localhost:3000** and will serve both frontend and API.

---
## Running Backend & Frontend Separately
If you want to run the frontend and backend separately:

### 1️⃣ Run Backend Individually
```sh
cd backend
npm install
npm start
```
> **Note:** The backend runs on **http://localhost:3000** by default.

### 2️⃣ Setup & Run Frontend
Modify `api.js` in `/frontend` to match the backend URL:
```js
const API_URL = "http://localhost:3000";
```
Then, install and start the frontend:
```sh
cd ../frontend
npm install
npm run dev
```
The frontend will start on **http://localhost:5173** (default Vite port).

---

## Environment Variables
### `.env` Example for Backend
Create a `.env` file in the **/backend** folder and set the following variables:
```env
PORT=3000
MONGODB_URI= your-mongo-uri
```

---
## API Endpoints
### `GET /tasks`
- Fetches all tasks

### `POST /tasks`
- Creates a new task

### `PUT /tasks/:id`
- Updates a task

### `DELETE /tasks/:id`
- Deletes a task

---
## Tech Stack
- **Frontend:** React + Vite, DaisyUI, TailwindCSS
- **Backend:** Node.js, Express, MongoDB
- **Database:** MongoDB

---
## Contributing
Feel free to fork and contribute to this project! PRs are welcome.



