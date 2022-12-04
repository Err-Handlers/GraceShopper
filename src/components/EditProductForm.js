import { callApi, updateApi } from "../api/utils";
import { useEffect, useState } from "react";
import Products from "./Products";
import swal from "sweetalert";

const EditProductForm = ({
  product,
  token,
  setProducts,
  isAdmin,
  productToEdit,
  onProductEditedHandler,
  error
}) => {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [imageURL, setImageURL] = useState(product.imageURL);
  const [inventory, setInventory] = useState(product.inventory);
  const [priceInCents, setPriceInCents] = useState(product.priceInCents);

  // const updatedProduct = {name, description, isGlutenFree, isSweet, imageURL, inventory, priceInCents}

  const editProduct = async (event) => {
    event.preventDefault(); 

    try {
      const response = await callApi({
        token,
        method: "PATCH",
        path: `/products/${product.id}`,
        body: {
          name: name,
          description: description,
          imageURL: imageURL,
          inventory: inventory,
          priceInCents: priceInCents,
        },
      });

      onProductEditedHandler();
      swal({
        text:"Sticker has been edited!",
      });
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={editProduct}>
          <center><h5>Title</h5></center>
          <input
            className="form-control w-75 mx-auto"
            type="text"
            name="title"
            value={name}
            placeholder="product title"
            onChange={(event) => setName(event.target.value)}
          />
          <br></br>
          <center><h5>Description</h5></center>
          <input
          className="form-control w-75 mx-auto"
            type="text"
            name="description"
            value={description}
            placeholder="product description"
            onChange={(event) => setDescription(event.target.value)}
          />
          <br></br>
          <center><h5>Image URL</h5></center>
          <input
            className="form-control w-75 mx-auto"
            type="text"
            name="description"
            value={imageURL}
            placeholder="product url"
            onChange={(event) => setImageURL(event.target.value)}
          />
          <br></br>
          <center><h5>Price - In Cents</h5></center>
          <input
            className="form-control w-75 mx-auto"
            type="text"
            name="price"
            value={priceInCents}
            placeholder="priceincents"
            onChange={(event) => setPriceInCents(event.target.value)}
          />
          <br></br>
          <center><h5>Inventory</h5></center>
          <input
            className="form-control w-75 mx-auto"
            type="text"
            name="inventory"
            value={inventory}
            placeholder="inventory"
            onChange={(event) => setInventory(event.target.value)}
          />
          <br></br>
          <center><button type="submit" className="btn btn-primary w-25">Update Sticker</button></center>
        </form>
      </div>
    </div>
  );
};
export default EditProductForm;
