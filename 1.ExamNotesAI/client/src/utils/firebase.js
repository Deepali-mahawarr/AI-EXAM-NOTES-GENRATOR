
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "exam-notes-687a1.firebaseapp.com",
  projectId: "exam-notes-687a1",
  storageBucket: "exam-notes-687a1.firebasestorage.app",
  messagingSenderId: "97072946991",
  appId: "1:97072946991:web:3b220cc938680cabd4cbda"
 // measurementId: "G-W3F76Y23CE"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth , provider}




// import { initializeApp } from "firebase/app";
// import {getAuth, GoogleAuthProvider} from "firebase/auth"

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
//   authDomain: "authexamnotes.firebaseapp.com",
//   projectId: "authexamnotes",
//   storageBucket: "authexamnotes.firebasestorage.app",
//   messagingSenderId: "198091553006",
//   appId: "1:198091553006:web:cd719d4ee1ebf391139bff"
// };


// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app)

// const provider = new GoogleAuthProvider()

// export {auth , provider}

