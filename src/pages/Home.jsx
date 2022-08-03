import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import { auth, db } from "../config/firebase-config";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";

// Navbar and Products components are rendered inside a parent component Homepage
function Home() {
	// get curr user Function
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
	// console.log(user);

	// state of products
	const [products, setProducts] = useState([]);

	// getting Products Function
	const getProducts = async () => {
		//Get all products from db => collection => Products folder
		const products = await getDocs(collection(db, "Products"));
		const productsArray = [];
		for (var snap of products.docs) {
			var data = snap.data();
			data.ID = snap.id;
			productsArray.push({
				...data,
			});
			if (productsArray.length === products.docs.length) {
				setProducts(productsArray);
			}
		}
	};

	useEffect(() => {
		getProducts();
	}, []);

	return (
		<>
			{/* Props are arguments passed into React components */}
			<Navbar user={user} />
			<br></br>
		</>
	);
}

export default Home;
