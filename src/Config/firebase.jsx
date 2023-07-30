
import { initializeApp } from "firebase/app";
 import {getAuth} from 'firebase/auth'
 import { getDatabase } from "firebase/database";
 import {getStorage} from "firebase/storage"
 

 const firebaseConfig = {
  apiKey: "AIzaSyA3JSbovUU3Z-JlpNlQLQOfvg8zG3piuLw",
  authDomain: "smitform.firebaseapp.com",
  databaseURL: "https://smitform-default-rtdb.firebaseio.com",
  projectId: "smitform",
  storageBucket: "smitform.appspot.com",
  messagingSenderId: "380843063415",
  appId: "1:380843063415:web:b47279d4ba1ae670e82e72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth =getAuth(app)
const db =getDatabase(app)
const storage =getStorage(app)
export {auth,db,storage}