import { callApi } from "../api/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartProduct from "./CartProduct";


//guest items add to cart using state, no API call and when they checkout is when they actually get added to the database using the email and a null password
//create order with status completed

function Cart({ token, cart, setCart, guestCart, setGuestCart}) {
  //render empty cart visuals
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [shippingName, setShippingName] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingZipcode, setShippingZipcode] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingStreet, setShippingStreet] = useState("");
  const [paymentName, setPaymentName] = useState("");
  const [paymentCardNumber, setPaymentCardNumber] = useState("");
  const [paymentCardDate, setPaymentCardDate] = useState("");
  const [paymentCardCVC, setPaymentCardCVC] = useState("");
  const [paymentCity, setPaymentCity] = useState("");
  const [paymentState, setPaymentState] = useState("");
  const [paymentStreet, setPaymentStreet] = useState("");
  const [paymentZipcode, setPaymentZipcode] = useState("");

  const fetchCart = async () => {
    try {
      if(token){
        const data = await callApi({ 
          path: "/cart",
          token });
          setCartProducts(data);
      }
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      fetchCart();
    }, []);

    const handleShowPayment = () => {
      setShowPayment(p => !p)
    }

    const handlePurchase = async () => {
      try {
        const data = await callApi({
          path: "/order_history",
          method: "PATCH",
          body: {orderId: cart[0].orderId},
          token
        })
        console.log(data);
      } catch (err) {
        console.log(err);
      }
     

    }
    
  
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
                 <CartProduct productInCart={productInCart} token={token} cart={cart} setCart={setCart} cartProducts={cartProducts} setCartProducts={setCartProducts} guestCart={guestCart}
                 setGuestCart={setGuestCart}/>
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
              <button className="cartButton" onClick={handleShowPayment}>CHECKOUT</button>
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

{showPayment && <div>
            <h1>Cart</h1>
            <form>
              <p>Shipping Details</p>
                <label>Full Name: </label>
                <input type="text" placeholder="Full Name" onChange={e => setShippingName(e.target.value)}/>
                <label>City: </label>
                <input type="text" placeholder="City" onChange={e => setShippingCity(e.target.value)}/>
                <label>State: </label>
                <input type="text" placeholder="State" onChange={e => setShippingState(e.target.value)}/>
                <label>Street: </label>
                <input type="text" placeholder="Street" onChange={e => setShippingStreet(e.target.value)}/>
                <label>Zipcode: </label>
                <input type="text" placeholder="Zipcode" onChange={e => setShippingZipcode(e.target.value)}/>
                <p>Payment Details</p>
                <label>Name On Card: </label>
                <input type="text" placeholder="Credit Card Holders Name" onChange={e => setPaymentName(e.target.value)}/>
                <label htmlFor="ccn">Card Number: </label>
                <input id="ccn" type="tel" inputMode="numeric" pattern="[0-9\s]{13,19}" maxLength="19" placeholder="xxxx xxxx xxxx xxxx"/>
                <label>City: </label>
                <input type="text" placeholder="City" onChange={e => setPaymentCity(e.target.value)}/>
                <label>State: </label>
                <input type="text" placeholder="State" onChange={e => setPaymentState(e.target.value)}/>
                <label>Street: </label>
                <input type="text" placeholder="Street" onChange={e => setPaymentStreet(e.target.value)}/>
                <label>Zipcode: </label>
                <input type="text" placeholder="Zipcode" onChange={e => setPaymentZipcode(e.target.value)}/>
                <input type="submit" onClick={handlePurchase}/>
            </form>
        </div>}

    </div>
  );
}

export default Cart;
