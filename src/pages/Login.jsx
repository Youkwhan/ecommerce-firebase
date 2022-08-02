import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase-config";

function Login() {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [errorMsg, setErrorMsg] = useState("");
	const [sucessMsg, setSucessMsg] = useState("");

	const handleLogin = (e) => {
		e.preventDefault();
		//console.log(email, password);
		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				setSucessMsg("Login Successfull. Redirecting to Homepage");
				setEmail("");
				setPassword("");
				setErrorMsg("");
				setTimeout(() => {
					setSucessMsg("");
					navigate("/");
				}, 3000);
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

			{sucessMsg && (
				<>
					<div className="sucess-msg">{sucessMsg} </div>
					<br></br>
				</>
			)}

			<form className="form-group" autoComplete="off" onSubmit={handleLogin}>
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
						Don't have an account. SignUp
						<Link to="/signup" className="link">
							Here
						</Link>
					</span>

					<button type="submit" className="form_btn_sucess">
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
