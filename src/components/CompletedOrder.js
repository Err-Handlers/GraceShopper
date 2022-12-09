import { callApi } from "../api/utils";
import { useEffect, useState } from "react";
import CompletedOrderList from "./CompletedOrderList";

function CompletedOrder({
  token 
}) {

  const [orderHistory, setOrderHistory] = useState([]);
  console.log("Order History :>> ", orderHistory);
  const getOrderHistory = async () => {
    const data = await callApi({
      path: "/order_history",
      token,
    });
    console.log("Completed Order data :>> ", data);
    setOrderHistory(data);
  };
  

  useEffect(() => {
    getOrderHistory()
    
  }, [])
  
  return (
    <div>
      {orderHistory.map((order) => {
        return (
          <div key={order.id}>
            <div>
            <CompletedOrderList completedOrderProducts={order.products} orderId={order.id} token={token}/>
            </div>
            <div>
            <p>{order.products.quantity}</p>
            <p>${order.totalPriceInCents / 100}.00</p>
            <p>{order.shippingFirstName} {order.shippingLastName}</p>
            <p>{order.ShippingState}</p>
            <p>{order.shippingCity}</p>
            <p>{order.shippingStreet}</p>
            <p>{order.shippingZipcode}</p>
            </div>
            <div>
              <p>{order.paymentName}</p>
              <p>{order.paymentState}</p>
              <p>{order.paymentCity}</p>
              <p>{order.paymentStreet}</p>
              <p>{order.paymentZipcode}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CompletedOrder;

// return (
//   <div>
//   <p></p>
{/* <img className="picBorder" src="" width="300" height="300"></img>; */}
//   <div>

// </div>
// );
