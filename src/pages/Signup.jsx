import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase-config";
import { doc, setDoc } from "firebase/firestore";

function Signup() {
	
	const navigate = useNavigate();

	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [errorMsg, setErrorMsg] = useState("");
	const [successMsg, setSuccessMsg] = useState("");

	const handleSignUp = (e) => {
		//Clicking on a Signup" button, prevent default form from submitting"
		e.preventDefault();
		//console.log(fullName, email, password);
		createUserWithEmailAndPassword(auth, email, password)
			.then((credentials) => {
				console.log(credentials);
				//Collection of users

				// collection(db, "users")
				// 	.doc(credentials.user.uid)
				// 	.set({
				// 		FullName: fullName,
				// 		Email: email,
				// 		Password: password,
				// 	})
				const ref = doc(db, "users", credentials.user.uid);
				setDoc(ref, {
					FullName: fullName,
					Email: email,
					Password: password,
				})
					.then(() => {
						setSuccessMsg("Signup Successfull. Redirecting to Login");
						setFullName("");
						setEmail("");
						setPassword("");
						setErrorMsg("");
						setTimeout(() => {
							setSuccessMsg("");
							navigate("/login");
						}, 3000);
					})
					.catch((error) => {
						setErrorMsg(error.message);
					});
			})
			.catch((error) => {
				setErrorMsg(error.message);
			});
	};

	return (
		<div className="container">
			<br></br>
			<br></br>

			<h1>Sign Up</h1>

			<hr></hr>

			{successMsg && (
				<>
					<div className="success-msg">{successMsg} </div>
					<br></br>
				</>
			)}

			<form className="form-group" autoComplete="off" onSubmit={handleSignUp}>
				<label htmlFor="fname">Full Name:</label>
				<input
					type="text"
					className="form-control"
					required
					onChange={(e) => setFullName(e.target.value)}
					value={fullName}
				></input>

				<br></br>

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
						Already have an account. Login
						<Link to="/login" className="link">
							Here
						</Link>
					</span>

					<button type="submit" className="btn btn-success btn-md">
						SIGN UP
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

export default Signup;
