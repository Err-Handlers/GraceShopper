import { useEffect, useState } from "react";
import CompletedOrderProduct from "./CompletedOrderProduct"
import { callApi } from "../api/utils";

function CompletedOrderList ({completedOrderProducts, orderId, token}) {

    return (
        <div>
           {completedOrderProducts.map((completedOrderProduct) => {
                return (
                    <div key={completedOrderProduct.id}>
                    <CompletedOrderProduct imageURL={completedOrderProduct.imageURL} name={completedOrderProduct.name}/>
                    <p>{completedOrderProduct.quantity}</p>
                    </div>
                )
                
           })}
        </div>
    )

}

export default CompletedOrderList