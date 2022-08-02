import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup() {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [errorMsg, setErrorMsg] = useState("");
	const [sucessMsg, setSucessMsg] = useState("");

	const handleSignUp = (e) => {
		//Clicking on a Signup" button, prevent default form from submitting"
		e.preventDefault();
		console.log(fullName, email, password);
	};

	return (
		<div className="container">
			<br></br>
			<br></br>

			<h1>Sign Up</h1>

			<hr></hr>

			<form className="form-group" autoComplete="off" onSubmit={handleSignUp}>
				<label htmlFor="fname">Full Name:</label>
				<input
					type="text"
					className="form_control"
					required
					onChange={(e) => setFullName(e.target.value)}
					value={fullName}
				></input>

				<br></br>

				<label htmlFor="email">Email:</label>
				<input
					type="email"
					className="form_control"
					required
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				></input>

				<br></br>

				<label htmlFor="password">Password:</label>
				<input
					type="password"
					className="form_control"
					required
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				></input>

				<br></br>

				<div className="form_btn">
					<span>
						Already have an account. Login
						<Link to="/login" className="link">
							Here
						</Link>
					</span>

					<button type="submit" className="form_btn_sucess">
						SIGN UP
					</button>
				</div>
			</form>
		</div>
	);
}

export default Signup;
