import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {

  apiKey: "AIzaSyDh8c14uwIjzmt5suHhfegriepgCndWxGk",
  authDomain: "proyectoutt-47d8d.firebaseapp.com",
  databaseURL: "https://proyectoutt-47d8d-default-rtdb.firebaseio.com",
  projectId: "proyectoutt-47d8d",
  storageBucket: "proyectoutt-47d8d.appspot.com",
  messagingSenderId: "760244445742",
  appId: "1:760244445742:web:1be2add8bc10811eab75bf",
  measurementId: "G-7C6MQ56Y7H"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);