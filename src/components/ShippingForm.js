import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { callApi } from "../api/utils";
const ShippingForm = ({
  setShippingFirstName,
  setShippingLastName,
  setShippingCity,
  setShippingStreet,
  setShippingState,
  setShippingZipcode,
  cartTotal,
}) => {
  const navigate = useNavigate();

  return (
    <div className="shippingContainer">
      <div className="shippingForm">
        <h4 className="orderDetailsHeader">Shipping Details</h4>
        <div className="shippingName">
          <div className="flex-col">
            <label>First Name: </label>
            <input
              type="text"
              // placeholder="John"
              onChange={(e) => setShippingFirstName(e.target.value)}
              className="checkoutInput"
              required="required"
              data-error="Please supply a first name"
            />
          </div>
          <div className="flex-col">
            <label>Last Name: </label>
            <input
              type="text"
              // placeholder="Smith"
              onChange={(e) => setShippingLastName(e.target.value)}
              className="checkoutInput"
              required="required"
              data-error="Please supply a last name"
            />
          </div>
        </div>
        <label>Address: </label>
        <input
          type="text"
          // placeholder="123 abc Street"
          onChange={(e) => setShippingStreet(e.target.value)}
          className="checkoutInput"
          required="required"
          data-error="Please supply a address"
        />
        <div className="shippingName">
          <div className="flex-col">
            <label>City: </label>
            <input
              type="text"
              // placeholder="City"
              onChange={(e) => setShippingCity(e.target.value)}
              className="checkoutInput"
              required="required"
              data-error="Valid email is required."
            />
          </div>
          <div className="flex-col">
            <label>State: </label>
            <input
              type="text"
              // placeholder="State"
              onChange={(e) => setShippingState(e.target.value)}
              className="checkoutInput"
              required="required"
              data-error="please supply a state"
            />
          </div>
          <div className="flex-col">
            <label>Zipcode: </label>
            <input
              type="text"
              // placeholder="Zipcode"
              onChange={(e) => setShippingZipcode(e.target.value)}
              className="checkoutInput"
              required="required"
              data-error="Please supply a zipzode"
            />
          </div>
        </div>
        <div className="cartButtons">
          <input
            className="cartButton"
            value="Go back"
            onClick={() => navigate("/cart")}
          ></input>
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
