import { useEffect, useState } from "react";
import { callApi } from "../api/utils";

const CartProduct = ({
  productInCart,
  token,
  cart,
  setCart,
  cartProducts,
  setCartProducts,
}) => {
  
    
  console.log('productInCart :>> ', productInCart);
    const [quantity, setQuantity] = useState(productInCart.quantity);
  const quantityUpdateHandler = async (token, quantity, productId, orderId) => {
    try {
      const updateQuantity = await callApi({
        method: "PATCH",
        path: "/cart",
        token,
        body: { quantity, productId, orderId },
      });
      setQuantity(updateQuantity.quantity);
      return updateQuantity;
    } catch (error) {
      console.log(error);
    }
  };
 
  const deleteHandler = async (token, productId, orderId) => {
    try {
      const deleteProduct = await callApi({
        method: "DELETE",
        path: "/cart",
        token,
        body: { productId, orderId },
      });
      if (deleteProduct) {
        setCartProducts( prev => prev.filter(p => p.productId !== productId));
        setCart( prev => prev.filter( p => p.productId !== productId ))
      }
      return cartProducts;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div key={productInCart.id} className="singularCartProduct">
      <div className="nameAndPhoto">
        <img src={productInCart.imageURL} width="100" height="100"></img>
        <h4 className="cartProductName">{productInCart.name}</h4>
      </div>
      <select
        defaultValue={productInCart.quantity}
        className="productQuantity"
        onChange={(e) =>
          quantityUpdateHandler(
            token,
            e.target.value,
            productInCart.productId,
            cart[0].orderId
          )
        }
      >
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
      </select>
      <p className="cartProductPrice">
        ${(productInCart.priceInCents / 100) * quantity}.00{" "}
        <span className="pricePerQuantity">
          (${productInCart.priceInCents / 100}.00 each)
        </span>
      </p>
      <p
        className="cartDeleteButton"
        onClick={() =>
          deleteHandler(token, productInCart.productId, cart[0].orderId)
        }
      >
        X
      </p>
    </div>
  );
};

export default CartProduct;
