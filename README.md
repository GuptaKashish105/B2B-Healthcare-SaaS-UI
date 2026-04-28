# B2B Healthcare SaaS UI

A modern React-based healthcare platform with Firebase authentication and real-time notifications.

## Features

- ✅ Firebase Authentication with session persistence
- ✅ Patient management with list/grid views
- ✅ Analytics dashboard with charts
- ✅ Service Worker with push notifications
- ✅ Responsive design with modern UI
- ✅ TypeScript for type safety
- ✅ Zustand for state management

## Setup Instructions

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable "Email/Password" provider
4. Enable Cloud Messaging (for push notifications):
   - Go to Project Settings > Cloud Messaging
   - Generate a new key pair for Web Push certificates
5. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll to "Your apps" section
   - Click "Add app" > Web app
   - Copy the config values

### 2. Environment Setup

1. Copy the environment template:

   ```bash
   cp .env.example .env
   ```

2. Fill in your Firebase configuration in `.env`:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_VAPID_KEY=your_vapid_key_here
   ```

### 3. Install Dependencies

```bash
npm install
```

### 4. Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
```

## Testing the Application

### Authentication

- Use any email/password combination to login (Firebase will accept it)
- Session persists across browser refreshes
- Logout works properly

### Notifications

- Click "Show notification" button on Dashboard
- Grant notification permission when prompted
- You'll see both local and Firebase Cloud Messaging notifications

### Patient Management

- Switch between List and Grid views
- View patient details and statistics

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Authentication**: Firebase Auth
- **Notifications**: Firebase Cloud Messaging + Service Worker
- **Icons**: Lucide React
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   └── Layout.tsx       # Main layout with navigation
├── features/
│   └── auth/            # Authentication logic
├── lib/
│   └── firebase.ts      # Firebase configuration
├── pages/               # Page components
├── store/               # Additional state stores
└── main.tsx            # App entry point
```

## Assignment Requirements Met

- ✅ React + TypeScript
- ✅ Firebase Authentication
- ✅ State Management (Zustand)
- ✅ Login, Dashboard, Analytics, Patient Details pages
- ✅ Patient data in Grid/List views with toggle
- ✅ Service Worker implementation
- ✅ Push notifications (local + FCM)
- ✅ Session handling and persistence
- ✅ Responsive UI/UX
- ✅ Clean code structure and scalability
