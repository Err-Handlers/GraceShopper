import React, { useState, useEffect } from 'react'
import { callApi } from '../api/utils'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import EditProductForm from "./EditProductForm";


const Products = ({token, isAdmin, productToEdit, cart, setCart}) => {
    const [show, setShow] = useState(false)
    const [quantity, setQuantity] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [products, setProducts] = useState([]);

    const [product, setProduct] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const fetchProducts = async () => {
      const data = await callApi({
        path: "/products",
      });
      setProducts(data);
    };

    useEffect(() => {
      fetchProducts();
    }, []);

    const productMatches = (product) => {
      const textToCheck = (
        product.name + product.description
      ).toLowerCase();
      return textToCheck.includes(searchValue.toLowerCase());
    };
  
    const filteredProducts = products.filter((product) => {
      return productMatches(product);
    });


    const handleClose = () => {
        setShow(false);
      };
      const handleShow = () => setShow(true);
      


    const addProductToCart = async (e, productId, token) => {
        e.preventDefault();
        try {
            //adding to order_products (which gives us primaryId, orderId, productId, quantity, and price)
            //cart is an array of all of these order_products that share the same orderId
            const data = await callApi({method: "POST", path: '/cart', token, body: {quantity, productId}})
            console.log('data :>> ', data);
            setCart( prev => [ data, ...prev])
        } catch (error) {
            console.log(error)
        }
    }
    
    // const token = localStorage.getItem("token");
    const deleteProduct = async (productId) => {
        try {
            await callApi({
                method: "DELETE",
                path: `/products/${productId}`,
                token
        })
        setProducts(
            (prev) => 
        prev.filter((product) => productId !== product.id))

        }
        catch (error) {
            console.log(error)
        }
    }

    function onProductEdited() {
        console.log("product was updated");
        fetchProducts();
        handleClose();
    }
    return (

    <>
        <br></br>
            <input
              className="searchBar mx-auto"
              type="text"
              placeholder="Sift through stickers..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            ></input>
            
        

        <br></br>
        {/* <img src="/assets/product_imgs/plantTrees.png" width="250" height ="250"></img> */}

        {filteredProducts.map(product => (

        <div key={product.id} className="productsContainer mx-auto">
            {/* {products.map((product) => {
                return ( */}
                <div className="singleProduct card" key={product.id}>
                    <img src={product.imageURL} width="300" height="300"></img>
                    <h3 className='productName'>{product.name}</h3>
                    {/* <h4>Inventory: {product.inventory}</h4> */}
                    <h4 className='productPrice'>{`$${product.priceInCents / 100}.00`}</h4>
                    {isAdmin ? <Button variant="secondary" onClick={()=>{deleteProduct(product.id)}}>Delete</Button> : null}
                    {isAdmin ? (
                <Button
                  variant="primary"
                  onClick={() => {
                    setSelectedProduct(product);
                    setShow(true);
                  }}
                >
                  Edit Product
                </Button>
              ) : null}

                    <form className='productButtonsContainer'>
                        <select className="productButtons" onChange={ e => setQuantity(e.target.value)}>
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                        </select>
                        <button className="productButtons" onClick={ e => addProductToCart(e, product.id, token)}>Add to cart</button>
                    </form>
                    <br></br>
                    <br></br>
                </div>
                {/* ); */}
            {/* })} */}

    <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditProductForm
              product={selectedProduct}
              isAdmin={isAdmin}
              token={token}
              setProducts={setProducts}
              productToEdit={productToEdit}
              onProductEditedHandler={onProductEdited}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        </div>

        ))}
    </>

    )
}

export default Products;

