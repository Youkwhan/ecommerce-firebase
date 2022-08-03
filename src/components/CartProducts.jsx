import React from "react";
import IndividualCartProduct from "./IndividualCartProduct";

function CartProducts({ cartProducts, cartProductIncrease, cartProductDecrease }) {
	return cartProducts.map((cartProduct) => (
		// we use round braces to return an object
		<IndividualCartProduct
			key={cartProduct.ID}
			cartProduct={cartProduct}
			cartProductIncrease={cartProductIncrease}
      cartProductDecrease={cartProductDecrease}
		/>
	));
}

export default CartProducts;
