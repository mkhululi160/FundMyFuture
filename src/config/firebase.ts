import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDLWur0CCLeem1-OpyChypqIzsmZJ6RStU",
  authDomain: "fundmyfuture-ecd64.firebaseapp.com",
  projectId: "fundmyfuture-ecd64",
  storageBucket: "fundmyfuture-ecd64.firebasestorage.app",
  messagingSenderId: "437398763650",
  appId: "1:437398763650:web:af3f254dec6155f069dc9b",
  measurementId: "G-KVFWT4NNJZ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);