import EditProductForm from "./EditProductForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { callApi } from "../api/utils";

const Product = ({token, isAdmin, productToEdit, cart, setCart, products, setProducts, fetchProducts, product}) => {
    const [show, setShow] = useState(false)
    const [quantity, setQuantity] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [inCartLabel, setInCartLabel] = useState(false);

    const addProductToCart = async ( e, token, quantity, productId,) => {
        e.preventDefault();
        console.log('quantity :>> ', quantity);
        console.log('productId :>> ', productId);
        try {
            //adding to order_products (which gives us primaryId, orderId, productId, quantity, and price)
            //cart is an array of all of these order_products that share the same orderId
            const data = await callApi({method: "POST", path: '/cart', token, body: {quantity, productId}})
            setCart( prev => [ data, ...prev])
            setInCartLabel( prev => !prev)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect( () => {
        cart.map( cartItem => {
            if(product.id === cartItem.productId){
                setInCartLabel(true)
            }
        })
    }, []);

    
    // const token = localStorage.getItem("token");
    const deleteProduct = async (productId) => {
        try {
            await callApi({
                method: "DELETE",
                path: `/products/${productId}`,
                token
        })
        setProducts( prev => prev.filter((product) => productId !== product.id))
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
    
    const handleClose = () => {
        setShow(false);
      };
      const handleShow = () => setShow(true);
      
    
    return (
                <div className="mx-auto">
                    <div className="singleProduct card">
                        <img className="picBorder" src={product.imageURL} width="300" height="300"></img>
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
                        { inCartLabel ? (
                            <p className="inCartLabel">Item is in cart</p>
                        ) : ( 
                        <div>
                        <form className='productButtonsContainer'>
                        <select className="productButtons" onChange={ (e) => setQuantity(e.target.value)}>
                            <option>0</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                        </select>
                        <button className="addToCartButton" onClick={ e => addProductToCart(e, token, quantity, product.id)}>Add to cart</button>
                    </form>
                    <br></br>
                    <br></br>
                    </div>) }
                       
                    </div>
    
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
    )
}

export default Product;