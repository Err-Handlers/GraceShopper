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
        <>
        <div className="mainContainer">
        <div className="cartContainer">
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
        </div>
        </div>
        </>
    )
}


export default Account;