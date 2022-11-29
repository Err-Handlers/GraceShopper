import { callApi } from "../api/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart({ token }) {
  //render empty cart visuals
  const navigate = useNavigate();
  const [cartProducts, setCartProducts] = useState([]);

  try {
    const fetchCart = async () => {
      const data = await callApi({ path: "/cart", token });
      setCartProducts(data);
      console.log("data :>> ", data);
    };
    useEffect(() => {
      fetchCart();
    }, []);
  } catch (error) {
    setError(error);
    console.log(error);
  }

    const deleteHandler = async (productId) => {
      try {
          const deleteProduct = await callApi({
          method: "DELETE",
          path: "/cart",
          token,
          body: { productId, orderId },
        });
        if (deleteProduct) {
          setCartProducts(deleteProduct);
        }
      } catch (error) {
        console.log(error);
      }
    };

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
              {cartProducts.map((product) => {
                return (
                  <div className="singularCartProduct">
                    <div className="nameAndPhoto">
                      <img
                        src={product.imageURL}
                        width="100"
                        height="100"
                      ></img>
                      <h4 className="cartProductName">{product.name}</h4>
                    </div>
                    <select className="productQuantity">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                    </select>
                    <p className="cartProductPrice">
                      ${product.priceInCents / 100}.00
                    </p>
                    <p
                      className="cartDeleteButton"
                      onClick={() => deleteHandler(token, product.id)}
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
              <button className="cartButton">CHECKOUT</button>
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
