import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./global.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AddProducts from "./pages/AddProducts";
import Cart from "./pages/Cart"
import NotFound from "./pages/NotFound";

function App() {
	return (
		<Router>
			<Routes>
				{/* React Route does partial matching, so "/" partially matches every route so we use exact! */}
				<Route exact path="/" element={<Home />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/login" element={<Login />} />
				<Route path="/add-products" element={<AddProducts />} />
				<Route path="/cart" element={<Cart />} />
				{/* Default path if user goes non existing route */}
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	);
}

export default App;
