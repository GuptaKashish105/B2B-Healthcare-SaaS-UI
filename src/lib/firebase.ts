import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize reCAPTCHA verifier
export const initializeRecaptcha = () => {
  try {
    const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: (token: string) => {
        console.log("reCAPTCHA token:", token);
      },
    });
    return verifier;
  } catch (error) {
    console.error("Error initializing reCAPTCHA:", error);
    return null;
  }
};

// Initialize Firebase Cloud Messaging (will be set asynchronously)
export let messaging: any = null;

// Initialize messaging asynchronously
import("firebase/messaging").then(({ isSupported, getMessaging }) => {
  isSupported().then((supported) => {
    if (supported) {
      messaging = getMessaging(app);
    }
  });
});

// Request permission and get token for push notifications
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted" && messaging) {
      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js",
      );

      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: registration,
      });
      console.log("FCM token:", token);
      return token;
    }
  } catch (error) {
    console.error("Error getting notification permission:", error);
  }
  return null;
};

// Listen for foreground messages (will be set up after messaging is initialized)
export const setupOnMessage = () => {
  if (!messaging) return;
  onMessage(messaging, (payload) => {
    console.log("Message received:", payload);
    new Notification(payload.notification?.title || "Healthcare Alert", {
      body: payload.notification?.body,
      icon: "/vite.svg",
    });
  });
};

export default app;
