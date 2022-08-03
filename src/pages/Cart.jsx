import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { auth, db } from "../config/firebase-config";
import { doc, getDoc, collection, onSnapshot } from "firebase/firestore";
import CartProducts from "../components/CartProducts";

function Cart() {
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
	// Our current user's name
	const user = GetCurrentUser();
	// console.log(user);

	// state of cart products
	const [cartProducts, setCartProducts] = useState("");

	// getting cart products from firestore collection and updating the cart state
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				onSnapshot(collection(db, "Cart " + user.uid), (snapshot) => {
					const newCartProduct = snapshot.docs.map((doc) => ({
						ID: doc.id,
						...doc.data(),
					}));
					setCartProducts(newCartProduct);
				});
			} else {
				console.log("User is not signed in to retrieve cart");
			}
		});
	}, []);
	console.log(cartProducts);

	return (
		<>
			<Navbar user={user} />
			<br></br>
			{cartProducts.length > 0 && (
				<div className="container-fluid">
					<h1 className="text-center">Cart</h1>
					<div className="products-box">
						<CartProducts cartProducts={cartProducts} />
					</div>
				</div>
			)}
			{cartProducts.length < 1 && (
				<div className="container-fluid">No products in cart</div>
			)}
		</>
	);
}

export default Cart;
