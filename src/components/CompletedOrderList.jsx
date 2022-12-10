import CompletedOrderProduct from "./CompletedOrderProduct"

function CompletedOrderList ({completedOrderProducts}) {
    return (
        <div>
           {completedOrderProducts.map((completedOrderProduct) => {
            return (
                <div key={completedOrderProduct.id} className="orderImgNameQuantityPrice">
                    <CompletedOrderProduct imageURL={completedOrderProduct.imageURL} name={completedOrderProduct.name}/>
                    <p className="orderProductQuantity">{completedOrderProduct.quantity}</p>
                    <p className="orderProductPrice">${completedOrderProduct.priceInCents / 100}.00</p>
                </div>
            )  
           })}
        </div>
    )
}

export default CompletedOrderList