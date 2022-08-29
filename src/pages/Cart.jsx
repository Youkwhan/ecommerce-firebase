import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { auth, db } from "../config/firebase-config";
import {
	doc,
	getDoc,
	getDocs,
	collection,
	onSnapshot,
	updateDoc,
	deleteDoc,
} from "firebase/firestore";
import CartProducts from "../components/CartProducts";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
	const [cartProducts, setCartProducts] = useState([]);

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
	//console.log(cartProducts);

	// Getting the qty from cartProducts in a seperate array to count total for checkout
	const qty = cartProducts.map((cartProduct) => {
		return cartProduct.qty;
	});
	// // Reducing the qty in a single value totalQty
	const reducerOfQty = (accumulator, currentValue) =>
		accumulator + currentValue;
	// // Sum of all elements in an array
	const totalQty = qty.reduce(reducerOfQty, 0);
	//console.log(totalQty);

	// // Getting the price from cartProducts in a seperate array to count total for checkout
	const price = cartProducts.map((cartProduct) => {
		return cartProduct.TotalProductPrice;
	});
	// // Reducing the price in a single value totalPrice
	const reducerOfPrice = (accumulator, currentValue) =>
		accumulator + currentValue;
	// // Sum of all elements in an array
	const totalPrice = price.reduce(reducerOfPrice, 0);
	//console.log(totalPrice);

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

	// state of totalProducts, which is send to Cart Page Navbar to be notifer
	const [totalProducts, setTotalProducts] = useState(0);
	// getting number of products in cart
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				onSnapshot(collection(db, "Cart " + user.uid), (snapshot) => {
					const qty = snapshot.docs.length;
					setTotalProducts(qty);
				});
			}
		});
	}, []);

	// Charging Payment. Token is used to connect our frontend and backend, Acts like a bridge between the two. We will send a response from our backend and that response will be tackled in this token function
	const navigate = useNavigate();
	const handleToken = async (token) => {
		// console.log(token);
		const cart = { name: "All Products", totalPrice };
		// send a response from front to backend
		const response = await axios.post("http://localhost:8080/checkout", {
			token,
			cart,
		});
		console.log(response);
		let { status } = response.data;
		console.log(status);
		if (status === "success") {
			navigate("/");
			toast.success("Your order has been placed successfully", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: false,
				draggable: false,
				progress: undefined,
			});
			console.log("toast ran");
			const uid = auth.currentUser.uid;
			const carts = await getDocs(collection(db, "Cart " + uid));
			for (var snap of carts.docs) {
				deleteDoc(doc(db, "Cart " + uid, snap.id));
			}
		} else {
			//alert("Something went wrong in checkout");
		}
	};

	return (
		<>
			<ToastContainer theme="dark" />
			<Navbar user={user} totalProducts={totalProducts} />
			<br></br>
			{cartProducts.length > 0 && (
				<div className="container-fluid">
					<h1 className="text-center">Your Shopping Cart</h1>
					<div className="products-box">
						<CartProducts
							cartProducts={cartProducts}
							cartProductIncrease={cartProductIncrease}
							cartProductDecrease={cartProductDecrease}
						/>
					</div>
					<div className="summary-box">
						<h5>Cart Summary</h5>
						<br></br>
						<div>
							Total No of Products: <span>{totalQty}</span>
						</div>
						<div>
							Total Price to Pay: <span>$ {totalPrice}</span>
						</div>
						<br></br>
						<StripeCheckout
							stripeKey="pk_test_51LSuXxAKnwZ9m1lykNhDNDqD3DSGdOKj1gLlm6YefSaNCMwDxunZ3Tu63UFepFOHaFaj1rY5SNc49S4ziURkjqJV00NcIFOfC6"
							token={handleToken}
							billingAddress
							shippingAddress
							name="All Products"
							amount={totalPrice * 100}
						></StripeCheckout>
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
