import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Products from "../components/Products";
import { auth, db } from "../config/firebase-config";
import {
	doc,
	getDoc,
	collection,
	getDocs,
	setDoc,
	onSnapshot,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// Navbar and Products components are rendered inside a parent component Homepage
function Home() {
	const navigate = useNavigate();

	// getting current user uid
	const GetUserUid = () => {
		const [uid, setUid] = useState(null);
		useEffect(() => {
			onAuthStateChanged(auth, (user) => {
				// Check for user status
				if (user) {
					setUid(user.uid);
				}
			});
		}, []);
		return uid;
	};
	//Current logged in uid
	const uid = GetUserUid();

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
	// Our user's name
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

	// state of totalProducts, which is send to Homepage Navbar to be notifer
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

	//Looping through individual Products from IndividualProduct which calls AddToCart which creates a new db collection with these attributes per item
	//global variable to add Product to firebase collection
	let Product;
	const addToCart = (product) => {
		//Determin if user logged in
		if (uid !== null) {
			// console.log(product);
			Product = product;
			Product["qty"] = 1;
			Product["TotalProductPrice"] = Product.qty * Product.price;
			setDoc(doc(db, "Cart " + uid, product.ID), Product).then(() => {
				console.log("Successfully added to cart");
			});
		} else {
			navigate("login");
		}
	};

	return (
		<>
			<Navbar user={user} totalProducts = {totalProducts}/>
			<br></br>
			{products.length > 0 && (
				<div className="container-fluid">
					<h1 className="text-center">Products</h1>
					<div className="products-box">
						<Products products={products} addToCart={addToCart} />
					</div>
				</div>
			)}
			{products.length < 1 && (
				//Because our product retrieval code is a async task
				<div className="container-fluid">Please wait...</div>
			)}
		</>
	);
}

export default Home;
