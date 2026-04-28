importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js",
);

// Initialize Firebase in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyD1w_dg01BssPjHaIZZHJucxhsZAuvRU1Y",
  authDomain: "b2b-healthcare-saas-app.firebaseapp.com",
  projectId: "b2b-healthcare-saas-app",
  storageBucket: "b2b-healthcare-saas-app.firebasestorage.app",
  messagingSenderId: "51353487197",
  appId: "1:51353487197:web:394aa57f66bc661fd5cab4",
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/vite.svg",
    badge: "/vite.svg",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
