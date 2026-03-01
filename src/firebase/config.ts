import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Replace with your actual Firebase configuration
export const firebaseConfig = {

    apiKey: "AIzaSyAOV2Dz0mrJAIT2DLQsrLCTC2bLO7lkzmI",

    authDomain: "conectacidade-5e46d.firebaseapp.com",

    projectId: "conectacidade-5e46d",

    storageBucket: "conectacidade-5e46d.firebasestorage.app",

    messagingSenderId: "740343372037",

    appId: "1:740343372037:web:a74dcf684844bc9167ff6c",

    measurementId: "G-GH3W7LBTWZ"

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
