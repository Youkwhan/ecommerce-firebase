import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/hamood.png";
import { Icon } from "react-icons-kit";
import { shoppingCart } from "react-icons-kit/feather/shoppingCart";
import { auth } from "../config/firebase-config";
import { signOut } from "firebase/auth";

function Navbar({ user, totalProducts }) {
	const navigate = useNavigate();

	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				//Sign-out successful
				navigate("/login");
			})
			.catch((error) => {
				//An error occured\
				console.log(error);
			});
	};

	return (
		<div className="navbar">
			<div className="leftside">
				<div className="logo">
					<img src={logo} alt="logo" />
				</div>
			</div>

			<div className="rightside">
				{!user && (
					<>
						{/* Check out NavLink */}
						<div>
							<Link className="navlink" to="/">
								HOME
							</Link>
						</div>
						<div>
							<Link className="navlink" to="/signup">
								SIGN UP
							</Link>
						</div>
						<div>
							<Link className="navlink" to="/login">
								LOGIN
							</Link>
						</div>
					</>
				)}

				{user && (
					<>
						<div>
							<Link className="navlink" to="/">
								{user}
							</Link>
						</div>
						<div className="car-menu-btn">
							<Link className="navlink" to="/cart">
								<Icon icon={shoppingCart} size={20} />
							</Link>
							<span className="cart_indicator">{totalProducts}</span>
						</div>
						<div className="btn btn-danger btn-md" onClick={handleLogout}>
							LOGOUT
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Navbar;
