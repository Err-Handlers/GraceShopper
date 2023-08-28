import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";

export default function CheckoutForm({
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
  cartTotal
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const addShippingInfo = async () => {
    try {
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
        },
        token,
        path: "/order_history/shipping",
      });
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const handlePurchase = async (e, error) => {
    e.preventDefault();
    try {
      if (token) {
        await addShippingInfo();
        const data = await callApi({
          path: "/cart/checkout",
          method: "PATCH",
          body: { orderId: cart[0].orderId, cartTotal: cartTotal * 100 },
          token,
        });

        // if (!error) {
        //   swal({
        //     text: "Your order was succesfully placed!",
        //   });
        // }
      } else {
        const guestUserId = await addGuestEmail();
        const guestOrderId = await addGuestOrder(guestUserId);
        await addGuestShippingInfo(guestOrderId);
        await addGuestPaymentInfo(guestOrderId);

        const addOrderProducts = guestCart.map(async (p) => {
          return addGuestOrderProduct(
            guestOrderId,
            p.quantity,
            p.priceInCents,
            p.id
          );
        });
        const guestOrderProducts = await Promise.all(addOrderProducts);
        if (!error) {
          swal({
            text: "Your order was succesfully placed!",
          });
        }
        navigate("/products");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    handlePurchase();
    location.reload();
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isProcessing || !stripe || !elements} id="submit" onClick={() => handleSubmit()}>
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Finish & Pay"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}