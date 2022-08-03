import React from "react";

function IndividualProduct({ individualProduct }) {
	console.log(individualProduct);
	// const handleAddToCart = () => {
	// 	addToCart(individualProduct);
	// };
	return (
		<div className="product">
			<div className="product-img">
				<img src={individualProduct.downloadURL} alt="product-img" />
			</div>
			<div className="product-text title">{individualProduct.title}</div>
			<div className="product-text description">
				{individualProduct.description}
			</div>
			<div className="product-text price">$ {individualProduct.price}</div>
			<div className="btn btn-danger btn-md cart-btn">ADD TO CART</div>
		</div>
	);
}

export default IndividualProduct;
