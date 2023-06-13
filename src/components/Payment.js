import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { callApi } from "../api/utils";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

const Payment = ({cart}) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  console.log("stripePromise :>> ", stripePromise);
  console.log("clientSecret :>> ", clientSecret);
  console.log('cart :>> ', cart);

  const fetchConfig = async () => {
    try {
      const data = await callApi({
        path: "/checkout/config",
      });
      setStripePromise(loadStripe(data.publishableKey));
    } catch (err) {
      console.log(err);
    }
  };

  const getPaymentIntent = async () => {
    try {
      const data = await callApi({
        method: "POST",
        path: "/checkout/create-payment-intent",
        body: cart
      });
      setClientSecret(data.clientSecret);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConfig();
    getPaymentIntent();
  }, []);

  return (
    <div className="payment-container">
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
