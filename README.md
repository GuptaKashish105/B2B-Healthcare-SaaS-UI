# 🏥 B2B Healthcare SaaS UI

A modern React-based healthcare platform with Firebase authentication and real-time notifications.

---

## 🚀 Live Demo

👉 https://b2-b-healthcare-saa-s-ui-mt7i.vercel.app/

---

### Demo Credentials

| Role | Email | Password |
|------|------|------|
| User | test@gmail.com | demo123 |
| Admin | admin@test.com | demo123 |

You can also use the built-in **Demo Login** buttons directly from the login screen.

## ✨ Features

* ✅ Firebase Authentication (Email/Password)
* ✅ Patient management (List & Grid views)
* ✅ Analytics dashboard with charts
* ✅ Push notifications using Service Worker + FCM
* ✅ Responsive modern UI
* ✅ TypeScript for type safety
* ✅ Zustand for scalable state management

---

## ⚙️ Firebase Setup

1. Go to Firebase Console

2. Create or use existing project

3. Enable Authentication:

   * Go to **Authentication → Sign-in method**
   * Enable **Email/Password**

4. Add users manually:

   * Go to **Authentication → Users**
   * Click **Add User**
   * Enter email & password

5. Enable Cloud Messaging:

   * Go to **Project Settings → Cloud Messaging**
   * Generate Web Push key

---

## 🌍 Environment Setup

Create `.env` file:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_VAPID_KEY=your_vapid_key
```

---

## 📦 Installation

```bash
npm install
```

---

## 💻 Run Locally

```bash
npm run dev
```

App runs on:
👉 http://localhost:5173

---

## 🏗 Build

```bash
npm run build
```

---

## 🧪 Features Walkthrough

### 🔐 Authentication

This project uses Firebase Authentication with pre-created demo users.

### Authentication Features

- Persistent login sessions
- Protected dashboard routes
- Demo login support
- Logout functionality

### 🔔 Notifications

* Click “Show notification”
* Grant permission
* Receive local + push notifications

### 🧑‍⚕️ Patient Management

* Switch between List & Grid
* View patient details

---

## 🛠 Tech Stack

* **Frontend**: React 18, TypeScript, Tailwind CSS
* **State Management**: Zustand
* **Auth**: Firebase Authentication
* **Notifications**: Firebase Cloud Messaging
* **Icons**: Lucide React
* **Build Tool**: Vite

---

## 📁 Project Structure

```
src/
├── components/
├── features/
├── lib/
├── pages/
├── store/
└── main.tsx
```

---

## 🎯 Future Improvements

* User signup flow
* Role-based access (Admin/User)
* Backend integration (Node.js APIs)
* Real-time database sync

---

## 🙌 Author

**Kashish Gupta**
Frontend Engineer • React • TypeScript • Scalable SaaS UI Development
