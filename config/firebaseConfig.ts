import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC5utU_IjuPt9xSfYICDrHmQywBCZYetVE",
  authDomain: "notevid.firebaseapp.com",
  projectId: "notevid",
  storageBucket: "notevid.appspot.com",
  messagingSenderId: "450810886736",
  appId: "1:450810886736:web:9cd0563528f0c0d2d7af55",
  measurementId: "G-N5XCBCRT7P",
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

export { auth };
