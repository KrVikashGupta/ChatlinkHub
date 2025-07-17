# ![](https://dummyimage.com/600x200/000/fff&text=ChatlinkHub) ChatlinkHub

**ChatlinkHub** is a sleek, real-time messaging web app with customizable profiles, secure authentication, and a clean, responsive design. Built with **Node.js, Express, Socket.io, PostgreSQL** on the backend and **React + TypeScript** on the frontend, it delivers seamless real-time messaging with a modern UI.

[![CI/CD](https://img.shields.io/github/actions/workflow/status/KrVikashGupta/ChatlinkHub/deploy-to-ec2.yml?label=Deploy&style=flat-square)](https://github.com/KrVikashGupta/ChatlinkHub/actions)

🌐 **Live Demo:** [chatlinkhub.my.to](http://chatlinkhub.my.to)

<img src="https://dummyimage.com/1200x500/222/fff&text=ChatlinkHub+Banner" alt="ChatlinkHub Preview" width="100%" style="border-radius: 20px;">

---

## 📑 Table of Contents

1. [✨ Features](#-features)
2. [🛠️ Tech Stack](#️-tech-stack)
3. [🚀 Getting Started](#-getting-started)
4. [🎉 Contributing](#-contributing)
5. [📩 Contact](#-contact)

---

## ✨ Features

### 👤 User Profiles & Authentication
- Secure JWT authentication with bcrypt hashing.
- Registration and login with email and password.
- Update user profile details with image upload.
- View online/offline status of users in real-time.

### 💬 Real-Time Messaging
- One-on-one messaging with **Socket.IO**.
- Live typing indicators and delivery/read receipts.
- Message timestamps and delivery status.
- Instant online presence detection.

### ⚡ Smooth User Experience
- Responsive UI for mobile and desktop.
- Live updates without refresh using web sockets.
- Clean, modern design with potential for dark/light theming.

---

## 🛠️ Tech Stack

### 🌐 Frontend
- **React + TypeScript**
- **Redux Toolkit**
- **Tailwind CSS + Shadcn**

### ⚙️ Backend
- **Node.js + Express**
- **Socket.IO**
- **Zod** (validation)

### 🗄️ Database
- **PostgreSQL**
- **Supabase** (if used for real-time updates)

### ☁️ DevOps & Cloud
- **AWS EC2/S3**
- **Docker**
- **GitHub Actions**

---

## 🚀 Getting Started

Follow these steps to run **ChatlinkHub** locally.

### 🖥️ Prerequisites
- [Node.js](https://nodejs.org/)
- PostgreSQL (local/hosted)

---

### 📝 Setup

1️⃣ **Clone the Repository**
```bash
git clone https://github.com/KrVikashGupta/ChatlinkHub.git
cd ChatlinkHub
