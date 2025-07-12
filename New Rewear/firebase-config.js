// Firebase Configuration
// Replace these placeholder values with your actual Firebase project credentials
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDCUmbNegiLN0hmAkNzPOvdT_RL8h94fmw",
    authDomain: "rewear-clothing.firebaseapp.com",
    databaseURL: "https://rewear-clothing-default-rtdb.firebaseio.com",
    projectId: "rewear-clothing",
    storageBucket: "rewear-clothing.firebasestorage.app",
    messagingSenderId: "756102423",
    appId: "1:756102423:web:0e4f50d798d5342b59f352",
    measurementId: "G-YE99CW4ZSR"
  };
// Initialize Firebase
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    
    // Export for use in other files
    window.firebaseAuth = auth;
    window.firebaseApp = firebase;
} 