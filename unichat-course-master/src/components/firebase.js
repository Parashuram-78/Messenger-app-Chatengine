import firebase from "firebase/app";
import "firebase/auth";

export const auth= firebase.initializeApp({

        apiKey: "AIzaSyCsqd1wrPwML1GP2jV8s4fbtGF6_Xzzgrk",
        authDomain: "unichat-89b43.firebaseapp.com",
        projectId: "unichat-89b43",
        storageBucket: "unichat-89b43.appspot.com",
        messagingSenderId: "883001420642",
        appId: "1:883001420642:web:8db6d9c3bc879a69079a3b"
}).auth();