import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';      //  Cloud Firestore'ı içe aktardik
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCdgJP8kzJ-LXBPIJVhMjjv7B7dcio_pg8",
    authDomain: "fir-education-7cc88.firebaseapp.com",
    projectId: "fir-education-7cc88",
    storageBucket: "fir-education-7cc88.firebasestorage.app",
    messagingSenderId: "224565557295",
    appId: "1:224565557295:web:ba9a2c92a37d1abdfcaeda"
};

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);

// Firestore veritabanına bağlantıyı oluştur
export const db = getFirestore(app);

// Firebase authentication baslat
export const auth = getAuth(app);

export const storage = getStorage(app);

