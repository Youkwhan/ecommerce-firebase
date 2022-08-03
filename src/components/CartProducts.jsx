import React from 'react'
import IndividualCartProduct from './IndividualCartProduct'

function CartProducts({cartProducts}) {
  return (
    cartProducts.map((cartProduct) =>(
      // we use round braces to return an object
      <IndividualCartProduct key={cartProduct.ID} cartProduct={cartProduct} />
    ))
  )
}

export default CartProducts