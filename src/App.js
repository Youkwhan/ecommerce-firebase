import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import "./global.css";


function App() {
	return (
		<Router>
			<Routes>
				{/* React Route does partial matching, so "/" partially matches every route so we use exact! */}
				<Route exact path="/" element={<Homepage />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/login" element={<Login />} />
			</Routes>
		</Router>
	);
}

export default App;
