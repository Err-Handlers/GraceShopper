function CompletedOrderProduct({ imageURL, name }) {
  return (
    <div>
      <p>{name}</p>
      <img src={imageURL} width="150" height="150" />
    </div>
  )
}

export default CompletedOrderProduct;
