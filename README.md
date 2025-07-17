# ChatlinkHub

**ChatlinkHub** is a sleek, real-time messaging web app featuring customizable profiles and secure authentication. Built with **Node.js, Express, Socket.io, and PostgreSQL** on the backend, and a **responsive React frontend with TypeScript**.



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

1. **Clone the Project**  
   Open your terminal and run the following commands:

   ```bash
   git clone https://github.com/KrVikashGupta/ChatlinkHub.git
   cd ChatlinkHub
   ```

2. **Set Up Environment Files**

    - Inside the root directory, you will see two folders: api and client.
    - Navigate to the api folder:
        ```bash
        cd api
        ```
    
        Create a .env file by copying the content from .api.env.example:
        ```bash
        cp ..api.env.example .env
        ```
    - Obtain your credentials by creating an account on the respective websites.
    - Replace env variables with your credentials 

    - Navigate to the client folder:
        ```bash
        cd ../client
        ```

        Create a .env file here too by copying the content from .client.env.example:
        ```bash
        cp .client.env.example .env
        ```

3. **Run the API and Client**

    - First, navigate to the api directory to start the backend server:
        ```bash
        cd api
        npm install
        npm run dev
        ```

    - Open a new terminal window, navigate to the client directory, and start the frontend:
        ```bash
        cd client
        npm install
        npm run dev
        ```

4. **Open the Application**

    - Once both the API and client are running, open your browser and go to: http://localhost:5173
    - You should now see the ChatlinkHub web app! 🎉

## 🎉 Contribute

We welcome contributions to ChatlinkHub! Here's how you can get involved:

1. **Fork and clone the repository**:  
   Fork this repo and clone it to your local machine to start working.

2. **Create a new branch**:  
   Create a branch for your changes (e.g., `feature-add-chat-notifications`).

3. **Submit a Pull Request**:  
   After making your changes, push your branch and create a Pull Request to the main repository.

---

### 🤝 Need Help?

💡 If you get stuck, feel free to reach out!

- Open an issue for help or tag me (@KrVikashGupta) in your PR.
- You can also contact me at [vikashkumargupta907@gmail.com](mailto:vikashkumargupta907@gmail.com).

Let's make ChatlinkHub even better together! 🚀
