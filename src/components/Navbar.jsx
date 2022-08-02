import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<div>
			{/* Check out NavLink */}
			<Link to="/">HOME</Link>
			<Link to="/signup">SIGN UP</Link>
			<Link to="/login">LOGIN</Link>
		</div>
	);
}

export default Navbar;
