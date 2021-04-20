import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDTnO90BDftgpi3G21o3J8DRqkAjjQKAn8",
    authDomain: "show-me-ea796.firebaseapp.com",
    projectId: "show-me-ea796",
    storageBucket: "show-me-ea796.appspot.com",
    messagingSenderId: "327722983585",
    appId: "1:327722983585:web:12abede58757eb897510e0",
    measurementId: "G-R14PRN5FQP"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseDB = firebase.firestore();

export default firebaseDB
