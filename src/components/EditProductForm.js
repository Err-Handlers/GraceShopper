import { callApi, updateApi } from "../api/utils";
import { useEffect, useState } from "react";
import Pastries from "./Pastries";

const EditProductForm = ({
  pastry,
  token,
  setPastries,
  isAdmin,
  pastryToEdit,
  onPastryEditedHandler,
}) => {
  const [name, setName] = useState(pastry.name);
  const [description, setDescription] = useState(pastry.description);
  const [isGlutenFree, setIsGlutenFree] = useState(null);
  const [isSweet, setIsSweet] = useState(null);
  const [imageURL, setImageURL] = useState(pastry.imageURL);
  const [inventory, setInventory] = useState(pastry.inventory);
  const [priceInCents, setPriceInCents] = useState(pastry.priceInCents);

  // const updatedProduct = {name, description, isGlutenFree, isSweet, imageURL, inventory, priceInCents}

  const editProduct = async (event) => {
    event.preventDefault(); 

    try {
      const response = await callApi({
        token,
        method: "PATCH",
        path: `/pastries/${pastry.id}`,
        body: {
          name: name,
          description: description,
          isGlutenFree: isGlutenFree,
          isSweet: isSweet,
          imageURL: imageURL,
          inventory: inventory,
          priceInCents: priceInCents,
        },
      });

      onPastryEditedHandler();
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //     setName(localStorage.getItem('Name'))
  //     setDescription(localStorage.getItem('Description'))
  //     setIsGlutenFree(localStorage.getItem('isGlutenFree'))
  //     setIsSweet(localStorage.getItem('isSweet'))
  //     setImageURL(localStorage.getItem('imageURL'))
  //     setInventory(localStorage.getItem('Inventory'))
  //     setPriceInCents(localStorage.getItem('priceInCents'))
  //     setId(localStorage.getItem("Id"))
  // }, [])

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
