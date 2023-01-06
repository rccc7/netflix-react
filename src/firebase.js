import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD66uPKeDa1gUMGP_So5pabXkXHC-56VAE",
    authDomain: "moviesdb-5fd64.firebaseapp.com",
    databaseURL: "https://moviesdb-5fd64.firebaseio.com",
    projectId: "moviesdb-5fd64",
    storageBucket: "moviesdb-5fd64.appspot.com",
    messagingSenderId: "761469368467",
    appId: "1:761469368467:web:a042747c2a47b8d01ff566",
    measurementId: "G-PFKEQ6PFE8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth }
//Here, we'll export default the database
export default db;