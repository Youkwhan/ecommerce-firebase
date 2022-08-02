import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBQAwG1mFDkg2ED1z2rEVQZ4-diNhHkBSs",
	authDomain: "ecommerce-d481f.firebaseapp.com",
	projectId: "ecommerce-d481f",
	storageBucket: "ecommerce-d481f.appspot.com",
	messagingSenderId: "15690157634",
	appId: "1:15690157634:web:b779a5938bb3830d7a27db",
	measurementId: "G-P9LDLPM64Z"
 };

const app = initializeApp(firebaseConfig);

//All the connections needed related to firebase, now we need to start using them
export const db = getFirestore(app);
export const auth = getAuth(app); //is our user
export const storage = getStorage(app);

