import { callApi } from "../api/utils";
import { useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
// import e from "cors";
// import Products from "./Products";

    
const CreateForm = ({token, navigate}) => {
    const [products, setProducts] = useState([])
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [inventory, setInventory] = useState("");
    const [priceInCents, setPriceInCents] = useState("")

    const fetchProducts = async () => {
        const data = await callApi({
          path: "/products"
        })
        setProducts(data);
      };
      
      useEffect(() => {
        fetchProducts();
      }, []);

// use navigate to pastries page
    const createProduct = async (event) => {
        event.preventDefault();
        
        try { 
            const {product} = await callApi ({
                method: "POST",
                path: "/products",
                token,
                    body: {
                        product: {
                            name,
                            description,
                            imageURL,
                            inventory,
                            priceInCents, 
                        }
                    }
            });

            setProducts((prev) => [product, ...prev]);
            setName("");
            setDescription("");
            setImageURL("");
            setInventory("");   
            setPriceInCents("")

            navigate("/products");
        } catch (error) {
        console.log(error)
        }
    };

    return (
        <div>
            <form onSubmit={createProduct}>
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
                
                <button type="submit">Add Product
                </button>
            </form>
        </div>
    )
}

export default CreateForm;