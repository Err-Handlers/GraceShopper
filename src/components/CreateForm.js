import { callApi } from "../api/utils";
import { useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import e from "cors";
import Pastries from "./Pastries";

const CreateForm = ({ token, navigate}) => {

    const [pastries, setPastries] = useState([])
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isGlutenFree, setIsGlutenFree] = useState(null);
    const [isSweet, setIsSweet] = useState(null);
    const [imageURL, setImageURL] = useState("");
    const [inventory, setInventory] = useState("");
    const [priceInCents, setPriceInCents] = useState("")

    const fetchPastries = async () => {
        const data = await callApi({
          path: "/pastries"
        })
        setPastries(data);
      };
      
      useEffect(() => {
        fetchPastries();
      }, []);

// use navigate to pastries page
    const createPastry = async (event) => {
        event.preventDefault();
        
        try { 
            const {pastry} = await callApi ({
                method: "POST",
                path: "/pastries",
                token,
                    body: {
                        pastry: {
                            name,
                            description,
                            isGlutenFree,
                            isSweet,
                            imageURL,
                            inventory,
                            priceInCents, 
                        }
                    }
            });

            setPastries((prev) => [pastry, ...prev]);
            setName("");
            setDescription("");
            setIsGlutenFree(null);
            setIsSweet(null);
            setImageURL("");
            setInventory("");   
            setPriceInCents("")

            navigate("/pastries");
        } catch (error) {
        console.log(error)
        }
    };

    return (
        <div>
            <form onSubmit={createPastry}>
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