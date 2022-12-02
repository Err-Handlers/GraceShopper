import { callApi } from "../api/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartProduct from "./CartProduct";

function Cart({ token, cart }) {
  //render empty cart visuals
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);
  // console.log('cartProducts :>> ', cartProducts);
  
  const fetchCart = async () => {
    try {
      const data = await callApi({ 
        path: "/cart",
        token });
      setCartProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCart();
  }, []);

  
  return (
    <div>
      {cartProducts.length > 0 ? (
        <div className="mainContainer">
          <div className="cartContainer">
            <div className="cartHeaders">
              <h3>ITEMS</h3>
              <h3>QTY</h3>
              <h3>PRICE</h3>
            </div>
            <div className="cartProducts">
              {cartProducts.map((productInCart) => {
                return (
                 <CartProduct productInCart={productInCart} token={token} cart={cart} cartProducts={cartProducts} setCartProducts={setCartProducts}/>
                );
              })}
            </div>
            <div className="cartButtons">
              <button
                className="cartButton"
                onClick={() => navigate("/products")}
              >
                I WANT MORE
              </button>
              <button className="cartButton">SUBMIT ORDER</button>
            </div>
          </div>
        </div>
      ) : (
        <p>Uh oh, look's like you have some shopping to do!</p>
      )}
    </div>
  );
}

export default Cart;
