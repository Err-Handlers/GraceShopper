import { callApi } from "../api/utils";
import { useEffect, useState} from 'react'
import Pastries from "./Pastries";


const EditProductForm = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isGlutenFree, setIsGlutenFree] = useState(null);
    const [isSweet, setIsSweet] = useState(null);
    const [imageURL, setImageURL] = useState("");
    const [inventory, setInventory] = useState("");
    const [priceInCents, setPriceInCents] = useState("");
    const [id, setId] = useState("")
    

    // let navigate = useNavigate();
    // const index = Pastries.map(function(event) {
    //     return event.id
    // }).indexOf(id)
    // const editProduct = async (event) => {
    //     event.preventDefault();
    //     let product = Pastries[index];
    //     product.Name = name;
    //     product.Description = description;
    //     product.isGlutenFree = isGlutenFree;
    //     product.isSweet = isSweet;
    //     product.imageURL = imageURL;
    //     product.inventory = inventory;
    //     product.priceInCents = priceInCents;
    //     navigate("/admin")
    // }
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
            <div> name: {name}
            {/* <form onSubmit={editProduct}>
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
                onChange={(event) =>setPriceInCents(event.target.value)}
                />
                <input
                type="text"
                name="inventory"
                value={inventory}
                placeholder="inventory"
                onChange={(event) =>setInventory(event.target.value)}
                />
                <button type="submit">Update Product
                </button>
            </form> */}
        </div>
        </div>
    )
}
export default EditProductForm