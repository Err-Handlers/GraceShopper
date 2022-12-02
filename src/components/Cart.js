import { callApi } from "../api/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartProduct from "./CartProduct";


//guest items add to cart using state, no API call and when they checkout is when they actually get added to the database using the email and a null password
//create order with status completed

function Cart({ token, cart, setCart }) {
  //render empty cart visuals
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);
  const fetchCart = async () => {
    try {
      const data = await callApi({ 
        path: "/cart",
        token });
        setCartProducts(data);
        console.log(data);
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
                 <CartProduct productInCart={productInCart} token={token} cart={cart} setCart={setCart} cartProducts={cartProducts} setCartProducts={setCartProducts}/>
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
              <button className="cartButton">CHECKOUT</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mainContainer">
        <div className="cartContainer">
          <p className="emptyCart">Uh oh, look's like you have some shopping to do!</p>
          </div>
          </div>
      )}
    </div>
  );
}

export default Cart;
