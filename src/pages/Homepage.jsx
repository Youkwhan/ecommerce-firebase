import React from "react";
import Navbar from "../components/Navbar";
import Products from "../components/Products";

//Navbar and Products components are rendered inside a parent component Homepage
function Homepage() {
	return (
		<>
			<Navbar />
         <Products />
		</>
	);
}

export default Homepage;
