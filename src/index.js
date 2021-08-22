import firebase from 'firebase/app';
import updateDisplay from './dom-manipulation';

const firebaseConfig = {
  apiKey: "AIzaSyBKrltG6M8cEmPV5wTv4tdkPj6Zn594F3M",
  authDomain: "budding-4944f.firebaseapp.com",
  projectId: "budding-4944f",
  storageBucket: "budding-4944f.appspot.com",
  messagingSenderId: "378968553877",
  appId: "1:378968553877:web:a0c8c97d18b6ba49789e9c"
};

firebase.initializeApp(firebaseConfig);

updateDisplay();
