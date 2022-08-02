import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [errorMsg, setErrorMsg] = useState("");
	const [sucessMsg, setSucessMsg] = useState("");

	const handleLogin = (e) => {
    e.preventDefault();
    console.log(email, password)
  };

	return (
		<div className="container">
			<br></br>
			<br></br>

			<h1>Login</h1>

			<hr></hr>

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
		</div>
	);
}

export default Login;
