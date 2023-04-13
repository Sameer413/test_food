import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBnQmEKFBXyQzMoDBjHXozbM3SmtV0aVgk",
    authDomain: "restaurant-a09e6.firebaseapp.com",
    databaseURL: "https://restaurant-a09e6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "restaurant-a09e6",
    storageBucket: "restaurant-a09e6.appspot.com",
    messagingSenderId: "240547545578",
    appId: "1:240547545578:web:b81d031027fe961481f293"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)

const firestore = getFirestore(app)

const storage = getStorage(app)

export { app, firestore, storage }