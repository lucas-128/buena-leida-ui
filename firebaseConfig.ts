import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZBeYUNc0uxggg6gUQycs0MGrvY58pVGQ",
  authDomain: "buena-leida.firebaseapp.com",
  projectId: "buena-leida",
  storageBucket: "buena-leida.appspot.com",
  messagingSenderId: "258005056292",
  appId: "1:258005056292:web:063a432d6a5fa1f1bf91b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
