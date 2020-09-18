// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0vRWSzQRSbuN5ACgm68PCfLqA5V-luSg",
    authDomain: "react-firebase-app-de3b8.firebaseapp.com",
    databaseURL: "https://react-firebase-app-de3b8.firebaseio.com",
    projectId: "react-firebase-app-de3b8",
    storageBucket: "react-firebase-app-de3b8.appspot.com",
    messagingSenderId: "38449666276",
    appId: "1:38449666276:web:c7fd79acf7169c6b1674f1",
    measurementId: "G-5DS3SX9Y2R"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
