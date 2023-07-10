function CompletedOrderProduct({ imageURL, name }) {
  return (
    <div className="nameAndPhoto">
      <img src={imageURL} className="accountImg" width="100"
              height="100"/>
      <p className="orderProductName">{name}</p>
    </div>
  )
}

export default CompletedOrderProduct
