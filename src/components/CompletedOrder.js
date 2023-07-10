import { callApi } from "../api/utils";
import { useEffect, useState } from "react";
import CompletedOrderList from "./CompletedOrderList";

function CompletedOrder({ token }) {
  const [orderHistory, setOrderHistory] = useState([]);
  console.log('orderHistory :>> ', orderHistory);
  const getOrderHistory = async () => {
    const data = await callApi({
      path: "/order_history",
      token,
    });
    setOrderHistory(data);
  };

  useEffect(() => {
    getOrderHistory();
  }, []);
  return (
    <div>
      {orderHistory.map((order) => {
        return (
          <div className="singleOrderContainer" key={order.id}>
            <p>Order#: {order.id}</p>
            <div>
              <div className="orderHeader">
                <h3 className="orderHeaders">ITEMS</h3>
                <h3 className="orderHeaders">QTY</h3>
                <h3 className="orderHeaders">PRICE</h3>
              </div>
              <CompletedOrderList completedOrderProducts={order.products} />
            </div>
            <p className="orderTotal">
              Order Total: ${order.totalPriceInCents / 100}.00
            </p>
            <div className="shippingAndPaymentDiv">
              <div>
                <h4 className="shippingHeader">Shipping Details: </h4>
                <p>
                  {order.shippingFirstName} {order.shippingLastName}
                </p>
                <p>{order.shippingStreet}</p>
                <p>
                  {order.shippingCity}, {order.shippingState}
                </p>
                <p>{order.shippingZipcode}</p>
              </div>
              {/* <div>
                <h4 className="shippingHeader">Payment Details: </h4>
                <p>{order.paymentName}</p>
                <p>{order.paymentStreet}</p>
                <p>
                  {order.paymentCity}, {order.paymentState}
                </p>
                <p>{order.paymentZipcode}</p>
              </div> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CompletedOrder;
