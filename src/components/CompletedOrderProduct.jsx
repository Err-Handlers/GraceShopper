function CompletedOrderProduct({ imageURL, name }) {
  return (
    <div className="orderProductImgName">
      <img src={imageURL} width="150" height="150" />
      <p className="orderProductName">{name}</p>
    </div>
  )
}

export default CompletedOrderProduct
