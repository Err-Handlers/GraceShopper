import { useEffect, useState } from "react";
import { callApi } from "../api/utils";

const Account = ({token, shippingFirstName, shippingLastName, shippingState, shippingZipcode, shippingCity, shippingStreet}) => {
    console.log('shippingFirstName :>> ', shippingFirstName);
    const [ history, setHistory] = useState([]);
    console.log('history :>> ', history);
    const getOrderHistory = async () => {
        const data = await callApi({
            path: "/order_history",
            token
        })
        console.log('data :>> ', data);
        setHistory(data)
    }
    useEffect(() => {
        getOrderHistory();
    }, [])
    return (
        <div className="mainContainer">
        <div className="cartContainer">
        <div className="allOrderContainer">
                <div className="adminUserContainer">
                    <p>Order Id: 002</p>
                </div>
                <h4>Shipping Details</h4>
                <p>Michael Scott</p>
                <p>123 Dunder Mifflin Ave. </p>
                <p>Scranton, Pennsylvania 18503</p>
                <br></br>
                <br></br>
                <h4>Payment Details</h4>
                <p>Michael Scott</p>
                <p>123 Sesame St.</p>
                <p>Scranton, Pennsylvania 18503</p>
                <p>Card ending in: 1234</p>
                <br></br>
                <br></br>
                <h4>Items Ordered:</h4>
                <p>Popsicle (2) </p>
                <p>Sunny Side Up (1)</p>
            </div>
            
      
            
                </div>
                </div>
       
    )
}

{/* {history.map((h) => {
                return (
                    <div key={h.id}>
                    <p>{h.name}</p>
                    <img className="picBorder" src={h.imageURL} width="300" height="300"></img>
                    <p>{shippingFirstName} {shippingLastName}</p>
                    <p>{shippingState}</p>
                    <p>{shippingCity}</p>
                    <p>{shippingStreet}</p>
                    <p>{shippingZipcode}</p>
                    </div>
                ) })} */}

export default Account;