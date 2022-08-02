import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/hamood.png"

function Navbar() {
	return (
		<div className="navbar">
			<div className="leftside">
				<div className="logo">
					<img src={logo} alt="logo" />
				</div>
			</div>

			<div className="rightside">
				{/* Check out NavLink */}
				<div><Link className="navlink" to="/">HOME</Link></div>
				<div><Link className="navlink" to="/signup">SIGN UP</Link></div>
				<div><Link className="navlink" to="/login">LOGIN</Link></div>
			</div>
		</div>
	);
}

export default Navbar;
