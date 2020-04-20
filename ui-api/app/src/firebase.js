import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyAhBZ-ksjbq6cB8cE7mFJV25mieAyKdsuM",
    authDomain: "detours-bb95f.firebaseapp.com",
    databaseURL: "https://detours-bb95f.firebaseio.com",
    projectId: "detours-bb95f",
    storageBucket: "detours-bb95f.appspot.com",
    messagingSenderId: "1093347990752",
    appId: "1:1093347990752:web:c76d082af65630feed4485",
    measurementId: "G-HHTS8X31N4"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();
