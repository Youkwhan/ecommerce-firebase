import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Products from "../components/Products";

//Navbar and Products components are rendered inside a parent component Homepage
function Home() {
	//getting current user Function

	return (
		<>
			<Navbar />
			<Products />
		</>
	);
}

export default Home;
