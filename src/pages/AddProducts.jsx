import React, { useState } from "react";
import { storage, db } from "../config/firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

function AddProducts() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [image, setImage] = useState(null);

	const [imageError, setImageError] = useState("");

	const [successMsg, setSuccessMsg] = useState("");
	const [uploadError, setUploadError] = useState("");

	const types = ["image/jpg", "image/png", "image/PNG"];
	const handleProductImg = (e) => {
		//Restrict user to only select image file type
		let selectedFile = e.target.files[0];
		if (selectedFile) {
			if (selectedFile && types.includes(selectedFile.type)) {
				setImage(selectedFile);
				setImageError("");
			} else {
				setImage(null);
				setImageError("Please select a valid image file type (png or jpg)");
			}
		} else {
			console.log("Please select your file");
		}
	};

	const handleAddProducts = (e) => {
		e.preventDefault();
		// console.log(title, description, price);
		// console.log(image);

		// Upload file to the fb storage in `product-images/${image.name}`
		const storageRef = ref(storage, `product-images/${image.name}`);
		const uploadTask = uploadBytesResumable(storageRef, image);
		// Listen for state changes, errors, and completion of the upload.
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
			},
			(error) => {
				setUploadError(error.message);
			},
			() => {
				// Upload completed successfully in fb storage, now we can get the download URL to save into our fb database
				// getDownloadURL(ref(storage, 'product-images').child(image.name)).then(downloadUrl=>{})
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					addDoc(collection(db, "Products"), {
						title,
						description,
						price: Number(price),
						downloadURL,
					})
						.then(() => {
							setSuccessMsg("Product added successfully");
							setTitle("");
							setDescription("");
							setPrice("");
							document.getElementById("file").value = "";
							setImageError("");
							setUploadError("");
							setTimeout(() => {
								setSuccessMsg("");
							}, 3000);
						})
						.catch((error) => setUploadError(error.message));
				});
			}
		);
	};

	return (
		<div className="container">
			<Link className="navlink" to="/">
				HOME
			</Link>
			<br></br>
			<br></br>
			<h1>Add Products</h1>
			<hr></hr>
			{successMsg && (
				<>
					<div className="success-msg">{successMsg}</div>
					<br></br>
				</>
			)}
			<form
				className="form-group"
				autoComplete="off"
				onSubmit={handleAddProducts}
			>
				<label>Product Title</label>
				<input
					type="text"
					className="form-control"
					required
					onChange={(e) => setTitle(e.target.value)}
					value={title}
				></input>

				<br></br>
				<label>Product Description</label>
				<input
					type="text"
					className="form-control"
					required
					onChange={(e) => setDescription(e.target.value)}
					value={description}
				></input>

				<br></br>
				<label>Product Price</label>
				<input
					type="number"
					className="form-control"
					required
					onChange={(e) => setPrice(e.target.value)}
					value={price}
				></input>

				<br></br>
				<label>Upload Product Image</label>
				<input
					type="file"
					id="file"
					className="form-control"
					required
					onChange={handleProductImg}
				></input>
				{/* If user select any other file type other than image file */}
				{imageError && (
					<>
						<br></br>
						<div className="error-msg">{imageError}</div>
					</>
				)}

				<br></br>
				<div style={{ display: "flex", justifyContent: "flex-end" }}>
					<button type="submit" className="btn btn-success btn-md">
						SUBMIT
					</button>
				</div>
			</form>
			{uploadError && (
				<>
					<br></br>
					<div className="error-msg">{uploadError}</div>
				</>
			)}
		</div>
	);
}

export default AddProducts;
