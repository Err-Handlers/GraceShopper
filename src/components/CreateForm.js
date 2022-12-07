import { callApi } from "../api/utils";
import { useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
// import e from "cors";

    
const CreateForm = ({token, navigate, setProducts, error}) => {
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
            if (!error){
                swal({
                    text: "Sticker has been added!",
                });
            }
            navigate("/products");
        } catch (error) {
        console.log(error)
        }
    };

    return (
        <div className="form-group">
        <br></br>
            <form onSubmit={createProduct}>
                <center><h1 className="text-primary">Add a sticker!</h1></center>
                <br></br>
                <center><h5>Title</h5></center>
                <input
                className="form-control w-75 mx-auto"
                type="text"
                name="title"
                value={name}
                placeholder="Input product title..."
                onChange={(event) => setName(event.target.value)}
                />
                <br></br>
                <center><h5>Description</h5></center>
                <input
                className="form-control w-75 mx-auto"
                type="text"
                name="description"
                value={description}
                placeholder="Input product description..."
                onChange={(event) => setDescription(event.target.value)}
                />
                <br></br>
                <center><h5>Image URL</h5></center>
                <input
                className="form-control w-75 mx-auto"
                type="text"
                name="description"
                value={imageURL}
                placeholder="Input image url..."
                onChange={(event) => setImageURL(event.target.value)}
                />
                <br></br>
                <center><h5>Price - In Cents</h5></center>
                <input
                className="form-control w-75 mx-auto"
                type="text"
                name="price"
                value={priceInCents}
                placeholder="Input price in cents..."
                onChange={(event) =>setPriceInCents(event.target.value)}
                />
                <br></br>
                <center><h5>Inventory</h5></center>
                <input
                className="form-control w-75 mx-auto"
                type="text"
                name="inventory"
                value={inventory}
                placeholder="Set inventory..."
                onChange={(event) =>setInventory(event.target.value)}
                />
                <br></br>
                <center>
                <button type="submit" className="btn btn-primary w-25">Add Sticker
                </button>
                </center>
            </form>
        </div>
    )
}

export default CreateForm;