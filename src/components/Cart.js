import { callApi } from "../api/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartProduct from "./CartProduct";

function Cart({
  token,
  cart,
  setCart,
  guestCart,
  setGuestCart,
  shippingFirstName,
  setShippingFirstName,
  shippingLastName,
  setShippingLastName,
  shippingState,
  setShippingState,
  shippingZipcode,
  setShippingZipcode,
  shippingCity,
  setShippingCity,
  shippingStreet,
  setShippingStreet
}) {
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentName, setPaymentName] = useState("");
  const [paymentCardNumber, setPaymentCardNumber] = useState("");
  const [paymentCardCVC, setPaymentCardCVC] = useState("");
  const [paymentCity, setPaymentCity] = useState("");
  const [paymentState, setPaymentState] = useState("");
  const [paymentStreet, setPaymentStreet] = useState("");
  const [paymentZipcode, setPaymentZipcode] = useState("");
  const [cartTotal, setCartTotal] = useState(0);
  const [guestCartTotal, setGuestCartTotal] = useState(0);
  const [guestEmail, setGuestEmail] = useState("");
  const [guestUserId, setGuestUserId] = useState(null);
  const [guestOrderId, setGuestOrderId] = useState(null);

  const fetchCart = async () => {
    try {
      if (token) {
        const data = await callApi({
          path: "/cart",
          token,
        });
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
    setShowPayment((p) => !p);
  };

  const calculateTotal = () => {
    const initialValue = 0;
    const orderTotal = cartProducts.reduce((acccumulator, product) => {
      return acccumulator + (product.priceInCents * product.quantity) / 100;
    }, initialValue);
    return orderTotal;
  };

  useEffect(() => {
    setCartTotal(calculateTotal());
  }, [cartProducts]);

  const calculateGuestCartTotal = () => {
    const initialValue = 0;
    const orderTotal = guestCart.reduce( (accumulator, product) => {
      return accumulator + (product.priceInCents * product.quantity) /100;
    }, initialValue);
    return orderTotal;
  }

  useEffect( () => {
    setGuestCartTotal(calculateGuestCartTotal());
  }, [guestCart])

  const addGuestEmail = async () => {
    try {
      const data = await callApi({
        method: "POST",
        path: "/guest/email",
        body: {email: guestEmail}
      })
      setGuestUserId(data.id)
      console.log("USER DATA", data.id);
      return data.id;
    } catch (error) {
      console.log(error);
    }
  }

  const addGuestOrder = async (guestUserId) => {
    try {
      const data = await callApi({
        method: "POST",
        path: "/guest/order",
        body: {userId: guestUserId, totalPriceInCents: (guestCartTotal * 100)}
      })
        setGuestOrderId(data.id)
        console.log("ORDER DATA", data.id);
        return data.id;
    } catch (error) {
      console.log(error);
    }
  }

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
          cardCvc: paymentCardCVC,
        },
        token,
        path: "/order_history/payment",
      });
      console.log("payment data :>> ", data);
      setPaymentDate(() => new Date().getFullYear());
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const addGuestPaymentInfo = async () => {
    try {
      const data = await callApi({
        method: "POST",
        body: {
          name: paymentName,
          city: paymentCity,
          street: paymentStreet,
          state: paymentState,
          zipcode: paymentZipcode,
          orderId: guestOrderId,
          cardNumber: paymentCardNumber,
          cardCvc: paymentCardCVC,
        },
        token,
        path: "/order_history/payment",
      });
      console.log("payment data :>> ", data);
      setPaymentDate(() => new Date().getFullYear());
      return data;
    } catch (err) {
      console.log(err);
    }
  };

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
          orderId: cart[0].orderId,
          orderDate: date,
        },
        token,
        path: "/order_history/shipping",
      });
      console.log("shipping data :>> ", data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const addGuestShippingInfo = async () => {
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
          orderId: guestOrderId
        },
        token,
        path: "/order_history/shipping",
      });
      console.log("shipping data :>> ", data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
const addGuestOrderProduct = async (guestOrderId, quantity, price, productId) => {
  try {
    const data = await callApi({
      path: "/guest/orderProducts",
      method: "POST",
      body: {
        quantity,
        priceInCents: price,
        productId,
        orderId: guestOrderId
      }
    })
    return data;
  } catch (error) {
    console.log(error);
  }
}

  const handlePurchase = async (e) => {
    e.preventDefault();
    try {
      if(token){
        await addShippingInfo();
        await addPaymentInfo();
        const data = await callApi({
          path: "/cart/checkout",
          method: "PATCH",
          body: { orderId: cart[0].orderId, cartTotal: cartTotal * 100 },
          token,
        });
  
        console.log("update status", data);
        navigate("/account");
      } else{
        const guestUserId = await addGuestEmail();
        const guestOrderId = await addGuestOrder(guestUserId);
        await addGuestShippingInfo(guestOrderId);
        await addGuestPaymentInfo(guestOrderId);
        
        const addOrderProducts = guestCart.map( async (p) => {
          return addGuestOrderProduct(guestOrderId, p.quantity, p.priceInCents, p.id)
        })
        const guestOrderProducts = await Promise.all(addOrderProducts)
        console.log("guestOrderProducts", guestOrderProducts);
        //have a thanks for your purchase, a confirmation email will be sent shortly.
      }
    } catch (err) {
      console.log(err);
    }
  };
  

  console.log('guestCart :>> ', guestCart);
  

  const cartProductsToDisplay = token ? cartProducts : guestCart;

  return (
    <div>
      {cartProductsToDisplay.length > 0 ? (
        <div className="mainContainer">
          <div className="cartContainer">
            <div className="cartHeaders">
              <h3 className="cartHeader">ITEMS</h3>
              <h3 className="cartHeader">QTY</h3>
              <h3 className="cartHeader">PRICE</h3>
            </div>
            <div className="cartProducts">
              {token ? (
                <div>
                  {cartProducts.map((productInCart) => {
                    return (
                      <CartProduct
                        productInCart={productInCart}
                        token={token}
                        cart={cart}
                        setCart={setCart}
                        cartProducts={cartProducts}
                        setCartProducts={setCartProducts}
                      />
                    );
                  })}
                  <p className="cartTotal">Total: ${cartTotal}.00</p>
                </div>
              ) : (
                <div>
                {guestCart.map((productInGuestCart) => {
                  return (
                    <CartProduct
                      productInGuestCart={productInGuestCart}
                      setGuestCart={setGuestCart}
                      guestCart={guestCart}
                    />
                  );
                })}
                <p className="cartTotal">Total: ${guestCartTotal}.00</p>
                </div>
              )}
            </div>
            <div className="cartButtons">
              <button
                className="cartButton"
                onClick={() => navigate("/products")}
              >
                I WANT MORE
              </button>
              <button className="cartButton" onClick={handleShowPayment}>
                CHECKOUT
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mainContainer">
          <div className="cartContainer">
            <p className="emptyCart">
              Uh oh, look's like you have some shopping to do!
            </p>
          </div>
        </div>
      )}
      {showPayment && (
        <div className="mainContainer">
        <div className="checkoutContainer">
          <h3 className="cartHeader">Please fill out the fields below to complete your order.</h3>
          <form>
            <br></br>
            {!token && (
              <div>
                <label>Email: </label>
                <input className="emailInput" type="text" placeholder="johnyappleseed@gmail.com" onChange={(e) => setGuestEmail(e.target.value)}></input>
                <span>(So we can send you an order confirmation email!)</span>
              </div>
            )}
            <h4 className="orderDetailsHeader">Shipping Details</h4>
            <label>First Name: </label>
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) => setShippingFirstName(e.target.value)}
              className="checkoutInput"
            />
            <label>Last Name: </label>
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => setShippingLastName(e.target.value)}
              className="checkoutInput"
            />
            <br></br>
            <label>Street: </label>
            <input
              type="text"
              placeholder="Street"
              onChange={(e) => setShippingStreet(e.target.value)}
              className="checkoutInput"
            />
            <label>Zipcode: </label>
            <input
              type="text"
              placeholder="Zipcode"
              onChange={(e) => setShippingZipcode(e.target.value)}
              className="checkoutInput"
            />
            <br></br>
            <label>City: </label>
            <input
              type="text"
              placeholder="City"
              onChange={(e) => setShippingCity(e.target.value)}
              className="checkoutInput"
            />
            <label>State: </label>
            <input
              type="text"
              placeholder="State"
              onChange={(e) => setShippingState(e.target.value)}
              className="checkoutInput"
            />
            <br></br>
            <br></br>
            <h4 className="orderDetailsHeader">Payment Details</h4>
            <label>Name On Card: </label>
            <input
              type="text"
              placeholder="Credit Card Holders Name"
              onChange={(e) => setPaymentName(e.target.value)}
              className="checkoutInput"
            />
            <label htmlFor="ccn">Card Number: </label>
            <input
              id="ccn"
              type="tel"
              inputMode="numeric"
              pattern="[0-9\s]{13,19}"
              maxLength="19"
              placeholder="xxxx xxxx xxxx xxxx"
              onChange={(e) => setPaymentCardNumber(e.target.value)}
              className="checkoutInput"
            />
            <label>CVC: </label>
            <input
              type="text"
              placeholder="CVC"
              onChange={(e) => setPaymentCardCVC(e.target.value)}
              className="checkoutInput"
            />
            <br></br>
            <label>Street: </label>
            <input
              type="text"
              placeholder="Street"
              onChange={(e) => setPaymentStreet(e.target.value)}
              className="checkoutInput"
            />
            <label>Zipcode: </label>
            <input
              type="text"
              placeholder="Zipcode"
              onChange={(e) => setPaymentZipcode(e.target.value)}
              className="checkoutInput"
            />
            <br></br>
             <label>City: </label>
            <input
              type="text"
              placeholder="City"
              onChange={(e) => setPaymentCity(e.target.value)}
              className="checkoutInput"
            />
            <label>State: </label>
            <input
              type="text"
              placeholder="State"
              onChange={(e) => setPaymentState(e.target.value)}
              className="checkoutInput"
            />
            <br></br>
            <div className="cartButtons">
            <input className="cartButton" type="submit" onClick={handlePurchase}/>
            </div>
          </form>
        </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
