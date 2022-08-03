import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { auth, db } from "../config/firebase-config";
import {
	doc,
	getDoc,
	collection,
	onSnapshot,
	updateDoc,
} from "firebase/firestore";
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
	// console.log(cartProducts);

	// global variable
	let Product;
	// cart product increase function called from IndividualCartProduct onClick (+)
	const cartProductIncrease = (cartProduct) => {
		// console.log(cartProduct);
		Product = cartProduct;
		Product.qty = Product.qty + 1;
		Product.TotalProductPrice = Product.qty * Product.price;
		// Update in firestore database
		auth.onAuthStateChanged((user) => {
			if (user) {
				updateDoc(doc(db, "Cart " + user.uid, cartProduct.ID), Product).then(
					() => {
						console.log("incremenet added");
					}
				);
			} else {
				console.log("user is not logged in to increment");
			}
		});
	};

	// cart product decrease functionlity
	const cartProductDecrease = (cartProduct) => {
		Product = cartProduct;
		if (Product.qty > 1) {
			Product.qty = Product.qty - 1;
			Product.TotalProductPrice = Product.qty * Product.price;
			// Update in firestore database
			auth.onAuthStateChanged((user) => {
				if (user) {
					updateDoc(doc(db, "Cart " + user.uid, cartProduct.ID), Product).then(
						() => {
							console.log("decrement added");
						}
					);
				} else {
					console.log("user is not logged in to decrement");
				}
			});
		}
	};

	return (
		<>
			<Navbar user={user} />
			<br></br>
			{cartProducts.length > 0 && (
				<div className="container-fluid">
					<h1 className="text-center">Cart</h1>
					<div className="products-box">
						<CartProducts
							cartProducts={cartProducts}
							cartProductIncrease={cartProductIncrease}
                     cartProductDecrease={cartProductDecrease}
						/>
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
