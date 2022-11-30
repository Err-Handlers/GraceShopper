import { callApi, updateApi } from "../api/utils";
import { useEffect, useState } from "react";
import Products from "./Products";

const EditProductForm = ({
  product,
  token,
  setProducts,
  isAdmin,
  productToEdit,
  onProductEditedHandler,
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={editProduct}>
          <input
            type="text"
            name="title"
            value={name}
            placeholder="product title"
            onChange={(event) => setName(event.target.value)}
          />
          <input
            type="text"
            name="description"
            value={description}
            placeholder="product description"
            onChange={(event) => setDescription(event.target.value)}
          />
          <input
            type="text"
            name="description"
            value={imageURL}
            placeholder="product url"
            onChange={(event) => setImageURL(event.target.value)}
          />
          <input
            type="text"
            name="price"
            value={priceInCents}
            placeholder="priceincents"
            onChange={(event) => setPriceInCents(event.target.value)}
          />
          <input
            type="text"
            name="inventory"
            value={inventory}
            placeholder="inventory"
            onChange={(event) => setInventory(event.target.value)}
          />
          <button type="submit">Update Product</button>
        </form>
      </div>
    </div>
  );
};
export default EditProductForm;
