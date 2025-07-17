# ChatlinkHub

**ChatlinkHub** is a sleek, real-time messaging web app featuring customizable profiles and secure authentication. Built with **Node.js, Express, Socket.io, and PostgreSQL** on the backend, and a **responsive React frontend with TypeScript**.

[![CI/CD](https://img.shields.io/github/actions/workflow/status/KrVikashGupta/ChatlinkHub/deploy-to-ec2.yml?label=Deploy&style=flat-square)](https://github.com/KrVikashGupta/ChatlinkHub/actions)

🌐 **Live Demo:** [chatlinkhub.my.to](http://chatlinkhub.my.to)

---

## 📑 Table of Contents

1. [✨ Features](#-features)
2. [🛠️ Tech Stack](#️-tech-stack)
3. [🚀 How to Run ChatlinkHub Locally](#-how-to-run-chatlinkhub-locally)
4. [🎉 Contributing](#-contributing)
5. [📩 Contact](#-contact)

---

## ✨ Features

### 👤 User Authentication & Profiles

- Register via email and JWT login.
- Search users by email or username.
- Profile with name, email, username, bio, and profile picture.
- Upload and update profile pictures with validation.
- Online/offline status display.
- Edit and update user profile securely.

---

### 💬 Messaging Features & Read Receipts

- One-on-one real-time text messaging with timestamps.
- Typing indicators during chat.
- Message status: sent, delivered, and read with receipts.

---

### ⚡ Real-Time Communication

- Real-time messaging using **Socket.IO**.
- Instant updates for delivery, read status, and typing indicators.
- Live online/offline presence tracking.

---

## 🛠️ Tech Stack

### 🌐 Frontend

- **React + TypeScript**: Dynamic, responsive UI.
- **Redux Toolkit**: State management.
- **Shadcn + Tailwind CSS**: Fast, modern styling.

### ⚙️ Backend

- **Node.js + Express.js**: RESTful APIs.
- **Socket.IO**: Real-time chat functionality.

### 🗄️ Database

- **PostgreSQL**: Relational database for secure storage.
- **Supabase**: Optional for real-time sync and management.

### ✅ Validation

- **Zod**: Ensures clean data validation.

### ☁️ Cloud & DevOps

- **AWS EC2**: Hosting.
- **AWS S3**: Profile picture storage.
- **Docker**: Containerization.
- **GitHub Actions**: CI/CD for automated deployments.

---

## 🚀 How to Run ChatlinkHub Locally

Follow these steps to set up **ChatlinkHub** on your local machine.

---

### 🖥️ Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- A PostgreSQL database (local or cloud-hosted)

---

### 📝 Steps to Get Started

1️⃣ **Clone the Project**

```bash
git clone https://github.com/KrVikashGupta/ChatlinkHub.git
cd ChatlinkHub
