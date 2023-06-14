import EditProductForm from "./EditProductForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { callApi } from "../api/utils";
import swal from "sweetalert";

const Product = ({
  token,
  isAdmin,
  cart,
  setCart,
  products,
  setProducts,
  fetchProducts,
  product,
  guestCart,
  setGuestCart,
  error
}) => {
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inCartLabel, setInCartLabel] = useState(false);
  console.log('quantity :>> ', quantity);
  
  const addProductToCart = async ({e, token, quantity, productId}) => {
    e.preventDefault();
    try {
      if (token) {
        const data = await callApi({
          method: "POST",
          path: "/cart",
          token,
          body: { quantity, productId },
        });
        setCart((prev) => [data, ...prev]);
        setInCartLabel((prev) => !prev);
      } else {
        const product = await callApi({
          path: `/guest/products/${productId}`,
        });
        setGuestCart((prev) => [...prev, { ...product, quantity }]);
        const localGuestCart = JSON.parse(localStorage.getItem("guestCart"))
        let newGuestCart = [{ ...product, quantity }];
        if(localGuestCart){
          newGuestCart = localGuestCart.push({ ...product, quantity })
        }
        localStorage.setItem("guestCart", JSON.stringify(newGuestCart))
        setInCartLabel((prev) => !prev);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (token) {
      cart.map((cartItem) => {
        if (product.id === cartItem.productId) {
          setInCartLabel(true);
        }
        if (cart.length = 0){
          setInCartLabel(false)
        }
      });
    } else {
      guestCart.map((cartItem) => {
        if (product.id === cartItem.productId) {
          setInCartLabel(true);
        }
        if (guestCart.length = 0){
          setInCartLabel(false)
        }
      });
    }
  }, []);
    
    const deleteProduct = async (productId) => {
        try {
            await callApi({
                method: "DELETE",
                path: `/products/${productId}`,
                token
        })
        setProducts( prev => prev.filter((product) => productId !== product.id))
        if(!error) {
          swal({
            text: "Sticker has been deleted!",
          });
        } 
        } catch (error) {
          console.log(error)
        }
      };


  function onProductEdited() {
    fetchProducts();
    handleClose();
  }

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="mx-auto">
      <div className="singleProduct card">
        <img
          className="picBorder"
          src={product.imageURL}
          width="300"
          height="300"
        ></img>
        <h3 className="productName">{product.name}</h3>

        <h4 className="productPrice">{`$${product.priceInCents / 100}.00`}</h4>

        <div className="btn-toolbar">
          {isAdmin ? (
            <div>
               <Button
                variant="primary"
                onClick={() => {
                  setSelectedProduct(product);
                  setShow(true);
                }}
              >
                Edit
              </Button>
            <Button
              variant="secondary mx-2"
              onClick={() => {
                deleteProduct(product.id);
              }}
            >
              Delete
            </Button>
              <br></br>
              <br></br>
            </div>
          ) : null}
        </div>
        {!isAdmin && (
          <div>
        {inCartLabel ? (
          <p className="inCartLabel">Item is in cart</p>
        ) : (
          <div>
            <form className="productButtonsContainer">
              <select
                className="productButtons"
                onChange={(e) => setQuantity(e.target.value)}
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </select>
              <button
                className="addToCartButton"
                onClick={(e) =>
                  addProductToCart({e, token, quantity, productId: product.id})
                }
              >
                Add to cart
              </button>
            </form>
            <br></br>
            <br></br>
          </div>
        )}
        </div>
        )}
      </div>
    
        <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Update Sticker</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <EditProductForm
                  token={token}
                  setProducts={setProducts}
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
