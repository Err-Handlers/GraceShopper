import { callApi } from "../api/utils";
import { useEffect, useState } from "react";

export default function cart({ token }) {
  const [cartPastries, setCartPastries] = useState([])
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
    <div>
      <h1>Cart</h1>
      {cartPastries.map((pastry) => {
        return(
        <div>
          <h3>{pastry.name}</h3>
          <h4>{pastry.description}</h4>
          <p>${pastry.priceInCents}</p>
        </div>
        )
      })}
    </div>
  );
}
