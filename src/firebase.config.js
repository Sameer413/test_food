import { getApp, getApps, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "ApiKey",
    authDomain: ".firebaseapp.com",
    databaseURL: "databaseUrl",
    projectId: "restaurant-a09e6",
    storageBucket: "restaurant-a09e6.appspot.com",
    messagingSenderId: "messagingSenderId",
    appId: "appId"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)

const firestore = getFirestore(app)

const storage = getStorage(app)

export { app, firestore, storage }
