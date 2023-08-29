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
  cartTotal,
  setCartTotal,
}) {
  const navigate = useNavigate();

  const [cartProducts, setCartProducts] = useState([]);
  const [guestCartTotal, setGuestCartTotal] = useState(0);

  const fetchCartProducts = async () => {
    try {
      if (token) {
        const data = await callApi({
          path: "/cart",
          token,
        });
        setCartProducts(data);
        console.log('cartProducts :>> ', data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCartProducts();
  }, []);

  const fetchCart = async () => {
    try {
      if (token) {
        const data = await callApi({
          path: "/cart/products",
          token,
        });
        setCart(data);
        console.log("cart", data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

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
    const orderTotal = guestCart.reduce((accumulator, product) => {
      return accumulator + (product.priceInCents * product.quantity) / 100;
    }, initialValue);
    return orderTotal;
  };

  useEffect(() => {
    setGuestCartTotal(calculateGuestCartTotal());
  }, [guestCart]);

  const cartProductsToDisplay = token ? cartProducts : guestCart;

  return (
    <div className="mainContainer">
      {cartProductsToDisplay.length > 0 ? (
        <div className="mainContainer">
          <h1>CART</h1>
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
                      <div>
                        <CartProduct
                          key={productInCart.id}
                          productInCart={productInCart}
                          token={token}
                          setCart={setCart}
                          cart={cart}
                          cartProducts={cartProducts}
                          setCartProducts={setCartProducts}
                        />
                      </div>
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
                I want more
              </button>
              <button
                className="cartButton"
                onClick={() => navigate("/shipping")}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mainContainer">
          <h1>CART</h1>
          <div className="cartContainer">
            <p className="emptyCart">
              Uh oh, look's like you have some shopping to do!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
