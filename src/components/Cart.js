import { callApi } from "../api/utils";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Cart({ token, cart }) {
  //render empty cart visuals
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  console.log('showPayment :>> ', showPayment);
  
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

  const quantityUpdateHandler = async (token, quantity, productId, orderId) => {
    console.log('quantity :>> ', quantity);
    try {
      const updateQuantity = await callApi({
        method: "PATCH",
        path: "/cart",
        token,
        body: {quantity, productId, orderId}
      });
      console.log('updateQuantity :>> ', updateQuantity);
      return updateQuantity;
    } catch (error) {
      console.log(error);
    }
  }
  
  console.log('cartProducts :>> ', cartProducts);
  const deleteHandler = async (token, productId, orderId) => {
    try {
      const deleteProduct = await callApi({
        method: "DELETE",
        path: "/cart",
        token,
        body: { productId, orderId }
      });
      if (deleteProduct) {
        const filteredCart = cartProducts.filter( p => p.productId !== productId )
        setCartProducts(filteredCart)
      }
      return cartProducts;
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowPayment = () => {
    setShowPayment(p => !p)
  }

  const handleSubmit = () => {
    console.log('Payment');
  }  
  
  return (
    <div>
      {cartProducts ? (
        <div className="mainContainer">
          <div className="cartContainer">
            <div className="cartHeaders">
              <h3>ITEMS</h3>
              <h3>QTY</h3>
              <h3>PRICE</h3>
            </div>
            <div className="cartProducts">
              {cartProducts.map((cartProduct) => {
                return (
                  <div key={cartProduct.id} className="singularCartProduct">
                    <div className="nameAndPhoto">
                      <img
                        src={cartProduct.imageURL}
                        width="100"
                        height="100"
                      ></img>
                      <h4 className="cartProductName">{cartProduct.name}</h4>
                    </div>
                    <select defaultValue={cartProduct.quantity} className="productQuantity" onChange={ (e) => quantityUpdateHandler(token, e.target.value, cartProduct.productId, cart[0].orderId )}>
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                    </select>
                    <p className="cartProductPrice">
                      ${(cartProduct.priceInCents / 100) * cartProduct.quantity}.00 <span className="pricePerQuantity">(${cartProduct.priceInCents / 100}.00 each)</span>
                    </p>
                    <p
                      className="cartDeleteButton"
                      onClick={() =>
                        deleteHandler(token, cartProduct.productId, cart[0].orderId)
                      }
                    >
                      X
                    </p>
                  </div>
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
              <button className="cartButton" onClick={handleShowPayment}>Checkout</button>
            </div>
            {showPayment && <div>
            <h1>Cart</h1>
            <form>
              <p>Shipping Details</p>
                <label>Full Name: </label>
                <input type="text" placeholder="Full Name"/>
                <label>City: </label>
                <input type="text" placeholder="City"/>
                <label>State: </label>
                <input type="text" placeholder="State"/>
                <label>Street: </label>
                <input type="text" placeholder="Street"/>
                <label>Zipcode: </label>
                <input type="text" placeholder="Zipcode"/>
                <p>Payment Details</p>
                <label>Name On Card: </label>
                <input type="text" placeholder="Credit Card Holders Name"/>
                <label htmlFor="ccn">Card Number: </label>
                <input id="ccn" type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}" maxLength="19" placeholder="xxxx xxxx xxxx xxxx"/>
                <label>City: </label>
                <input type="text" placeholder="City"/>
                <label>State: </label>
                <input type="text" placeholder="State"/>
                <label>Street: </label>
                <input type="text" placeholder="Street"/>
                <label>Zipcode: </label>
                <input type="text" placeholder="Zipcode"/>
                <input type="submit" onClick={handleSubmit}/>
            </form>
        </div>}
          </div>
        </div>
      ) : (
        <p>Uh oh, look's like you have some shopping to do!</p>
      )}
    </div>
  );
}

export default Cart;
