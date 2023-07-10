import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { callApi } from "../api/utils";
const ShippingForm = ({
  cart,
  token,
  shippingFirstName,
  setShippingFirstName,
  shippingLastName,
  setShippingLastName,
  shippingCity,
  setShippingCity,
  shippingStreet,
  setShippingStreet,
  shippingState,
  setShippingState,
  shippingZipcode,
  setShippingZipcode,
  cartTotal,
}) => {
  const navigate = useNavigate();
  console.log("cart :>> ", cart);
  console.log('cartTotal :>> ', cartTotal);

  console.log('shippingFirstName :>> ', shippingFirstName);

  return (
    <div className="shippingContainer">
      <div className="shippingForm">
        <h4 className="orderDetailsHeader">Shipping Details</h4>
        <label>First Name: </label>
        <input
          type="text"
          placeholder="First Name"
          onChange={(e) => setShippingFirstName(e.target.value)}
          className="checkoutInput"
          required="required"
          data-error="Please supply a first name"
        />
        <label>Last Name: </label>
        <input
          type="text"
          placeholder="Last Name"
          onChange={(e) => setShippingLastName(e.target.value)}
          className="checkoutInput"
          required="required"
          data-error="Please supply a last name"
        />
        <label>Street: </label>
        <input
          type="text"
          placeholder="Street"
          onChange={(e) => setShippingStreet(e.target.value)}
          className="checkoutInput"
          required="required"
          data-error="Please supply a address"
        />
        <label>City: </label>
        <input
          type="text"
          placeholder="City"
          onChange={(e) => setShippingCity(e.target.value)}
          className="checkoutInput"
          required="required"
          data-error="Valid email is required."
        />
        <label>State: </label>
        <input
          type="text"
          placeholder="State"
          onChange={(e) => setShippingState(e.target.value)}
          className="checkoutInput"
          required="required"
          data-error="please supply a state"
        />
        <label>Zipcode: </label>
        <input
          type="text"
          placeholder="Zipcode"
          onChange={(e) => setShippingZipcode(e.target.value)}
          className="checkoutInput"
          required="required"
          data-error="Please supply a zipzode"
        />
        <div className="cartButtons">
          <input
            className="cartButton"
            type="submit"
            value="Procced to payment"
            onClick={() => navigate("/payment")}
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
