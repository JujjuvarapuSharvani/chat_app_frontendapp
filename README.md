# 🎨 Frontend - Chat Application

## 📌 Overview

This is the frontend of the real-time chat application built using React and Vite.

It provides a WhatsApp-like UI where users can send, delete, and pin messages with real-time updates.

---

## 🚀 Features

* Send messages
* Real-time updates (Socket.IO)
* Delete messages:

  * Delete for Me
  * Delete for Everyone
* Pin messages 📌
* WhatsApp-style UI (left/right chat bubbles)

---

## 🛠️ Tech Stack

* React (Vite)
* Axios
* Socket.IO Client

---

## 📂 Folder Structure

client/
│── src/
│   │── components/
│   │   └── ChatBox.jsx
│   │── App.jsx
│   │── main.jsx
│── package.json

---

## ⚙️ Setup Instructions

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run frontend

```bash
npm run dev
```

---

## 🌐 Runs on

http://localhost:5173

---

## 🔗 Backend Connection

Make sure backend is running on:

http://localhost:5000

---

## 🧪 Testing

* Change `userId` in ChatBox.jsx:

```js
const userId = "user1";
```

or

```js
const userId = "user2";
```

* Test left/right message display

---

## ⚠️ Notes

* No authentication implemented
* Users are simulated manually
* Basic UI for faster development

---
