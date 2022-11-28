import { callApi } from "../api/utils";
import { useEffect, useState } from "react";

export default function cart({ token }) {
  const [cartPastries, setCartPastries] = useState([]);
  try {
    const fetchCart = async () => {
      const data = await callApi({ path: "/cart", token });
      setCartPastries(data);
      console.log("data :>> ", data);
    };
    useEffect(() => {
      fetchCart();
    }, []);
  } catch (error) {
    setError(error);
    console.log(error);
  }

  return (
    <div className="mainContainer">
      <div className="cartContainer">
        <div className="cartHeaders">
        <h3>ITEMS</h3>
        <h3>QTY</h3>
        <h3>PRICE</h3>
        </div>
        <div className="cartProducts">
      {cartPastries.map((pastry) => {
        return (
          <div className="singularCartProduct">
            <div className="nameAndPhoto">
                <img src={pastry.imageURL} width="100" height="100"></img>
                <h4 className="cartProductName">{pastry.name}</h4>
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
                  ${pastry.priceInCents / 100}.00
                </p>
              </div>
        );
      })}

        </div>
        <div className="cartButtons">
            <button className="cartButton">CONTINUE BROWSING</button>
            <button className="cartButton">CHECKOUT</button>
        </div>
      </div>
    </div>
  );
}
