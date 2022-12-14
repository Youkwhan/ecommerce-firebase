import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase-config";

function Login() {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [errorMsg, setErrorMsg] = useState("");
	const [successMsg, setSuccessMsg] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();
		//console.log(email, password);
		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				setSuccessMsg("Login Successfull. Redirecting to Homepage");
				setEmail("");
				setPassword("");
				setErrorMsg("");
				setTimeout(() => {
					setSuccessMsg("");
					navigate("/");
				}, 2000);
			})
			.catch((error) => {
				setErrorMsg(error.message);
			});
	};

	return (
		<div className="container">
			<br></br>
			<br></br>
			<h1>Login</h1>
			<hr></hr>
			{successMsg && (
				<>
					<div className="success-msg">{successMsg} </div>
					<br></br>
				</>
			)}
			<form className="form-group" autoComplete="off" onSubmit={handleLogin}>
				<label htmlFor="email">Email:</label>
				<input
					type="email"
					className="form-control"
					required
					onChange={(e) => setEmail(e.target.value)}
					value={email}
				></input>

				<br></br>
				<label htmlFor="password">Password:</label>
				<input
					type="password"
					className="form-control"
					required
					onChange={(e) => setPassword(e.target.value)}
					value={password}
				></input>

				<br></br>
				<div className="btn-box">
					<span>
						Don't have an account. SignUp
						<Link to="/signup" className="link">
							Here
						</Link>
					</span>

					<button type="submit" className="btn btn-success btn-md">
						LOGIN
					</button>
				</div>
			</form>
			{errorMsg && (
				<>
					<br></br>
					<div className="error-msg">{errorMsg} </div>
				</>
			)}
		</div>
	);
}

export default Login;
