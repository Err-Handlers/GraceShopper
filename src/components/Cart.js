import { callApi } from "../api/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartProduct from "./CartProduct";


//guest items add to cart using state, no API call and when they checkout is when they actually get added to the database using the email and a null password
//create order with status completed
let day = new Date().getDate();
let month = new Date().getMonth() + 1;
let year = new Date().getFullYear();
const date = `${month}/${day}/${year}`
console.log('date :>> ', date);
function Cart({ token, cart, setCart, guestCart, setGuestCart, shippingFirstName, setShippingFirstName, shippingLastName, setShippingLastName, shippingState, setShippingState, shippingZipcode, setShippingZipcode, shippingCity, setShippingCity, shippingStreet, setShippingStreet}) {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentName, setPaymentName] = useState("");
  const [paymentCardNumber, setPaymentCardNumber] = useState("");
  const [paymentDate, setPaymentDate] = useState(date);
  const [paymentCardCVC, setPaymentCardCVC] = useState("");
  const [paymentCity, setPaymentCity] = useState("");
  const [paymentState, setPaymentState] = useState("");
  const [paymentStreet, setPaymentStreet] = useState("");
  const [paymentZipcode, setPaymentZipcode] = useState("");
  const [cartTotal, setCartTotal] = useState(0);

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
    // if(cart) {
    //   console.log('cart[0].orderId :>> ', cart[0].id);
    // }
    const handleShowPayment = () => {
      setShowPayment(p => !p)
    }
    
    const calculateTotal = () => {
      const initialValue = 0;
      const orderTotal = cartProducts.reduce( (acccumulator, product) => {
        return(
          acccumulator + ((product.priceInCents * product.quantity) / 100)
        )
      }, initialValue);
      return orderTotal;
    }

    useEffect( () => {
      console.log("updating!!!!");
      console.log("new total = ", calculateTotal());
      setCartTotal(calculateTotal())
    }, [cartProducts])

    const addPaymentInfo = async () => {
      try {
        const data = await callApi({
          method: "POST",
          body: {
            name: paymentName,
            city: paymentCity,
            street: paymentStreet,
            state: paymentState,
            zipcode: paymentZipcode,
            orderId: cart[0].orderId,
            cardNumber: paymentCardNumber,
            cardCvc: paymentCardCVC
          },
          token,
          path: "/order_history/payment"
        })
        console.log('payment data :>> ', data);
        setPaymentDate(() => new Date().getFullYear())
        return data;
      } catch (err) {
        console.log(err);
      }
    }

    const addShippingInfo = async () => {
      try {
        console.log("TESTTTTTt");
        const data = await callApi({
          method: "POST",
          body: {
            firstName: shippingFirstName,
            lastName: shippingLastName,
            city: shippingCity,
            street: shippingStreet,
            state: shippingState,
            zipcode: shippingZipcode,
            orderId: cart[0].orderId
          },
          token,
          path: "/order_history/shipping"
        })
        console.log('shipping data :>> ', data);
        return data;
      } catch (err) {
        console.log(err);
      }
      
    }

    const handlePurchase = async (e) => {
      e.preventDefault();
      try {
        await addShippingInfo()
        await addPaymentInfo();
        const data = await callApi({
          path: "/cart/checkout",
          method: "PATCH",
          body: {orderId: cart[0].orderId, cartTotal: cartTotal*100},
          token
        })
        
        console.log("update status", data);
        navigate("/account")
      } catch (err) {
        console.log(err);
      }
    }
    
  const cartProductsToDisplay = token ? cartProducts : guestCart 

  return (
    <div>
      {cartProductsToDisplay.length > 0 ? (
        <div className="mainContainer">
          <div className="cartContainer">
            <div className="cartHeaders">
              <h3>ITEMS</h3>
              <h3>QTY</h3>
              <h3>PRICE</h3>
            </div>
            <div className="cartProducts">
              { token ? (
                <div>
                {cartProducts.map((productInCart) => {
                  return (
                   <CartProduct productInCart={productInCart} token={token} cart={cart} setCart={setCart} cartProducts={cartProducts} setCartProducts={setCartProducts}
                  />
                  );
                })}
                <p>Total: ${cartTotal}.00</p>
                </div>
                )
                : (
                  guestCart.map((productInGuestCart) => {
                    return (
                     <CartProduct productInGuestCart={productInGuestCart}
                     setGuestCart={setGuestCart} guestCart={guestCart}/>
                    );
                  }
                )
                )}
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
                <label>First Name: </label>
                <input type="text" placeholder="First Name" onChange={e => setShippingFirstName(e.target.value)}/>
                <label>Last Name: </label>
                <input type="text" placeholder="Last Name" onChange={e => setShippingLastName(e.target.value)}/>
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
                <input id="ccn" type="tel" inputMode="numeric" pattern="[0-9\s]{13,19}" maxLength="19" placeholder="xxxx xxxx xxxx xxxx" onChange={e => setPaymentCardNumber(e.target.value)}/>
                <label>CVC: </label>
                <input type="text" placeholder="CVC" onChange={e => setPaymentCardCVC(e.target.value)}/>
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
