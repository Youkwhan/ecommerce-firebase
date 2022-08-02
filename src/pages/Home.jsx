import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import { auth, db } from "../config/firebase-config";
import { doc, getDoc } from "firebase/firestore";

//Navbar and Products components are rendered inside a parent component Homepage
function Home() {
	//get curr user Function
	const GetCurrentUser = () => {
		const [user, setUser] = useState(null);
		useEffect(() => {
			auth.onAuthStateChanged((user) => {
				if (user) {
					const docRef = doc(db, "users", user.uid);
					getDoc(docRef).then((snapshot) => {
						setUser(snapshot.data().FullName);
					});
				} else {
					setUser(null);
				}
			});
		}, []);
		return user;
	};

	const user = GetCurrentUser();
	//console.log(user);

	return (
		<>
			{/* Props are arguments passed into React components */}
			<Navbar user={user}/>
			<Products />
		</>
	);
}

export default Home;
