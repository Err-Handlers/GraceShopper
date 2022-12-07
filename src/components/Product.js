import EditProductForm from "./EditProductForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { callApi } from "../api/utils";
import swal from "sweetalert";

const Product = ({
  token,
  isAdmin,
  productToEdit,
  cart,
  setCart,
  products,
  setProducts,
  fetchProducts,
  product,
  guestCart,
  setGuestCart,
  error,
  setCartTotal,
  cartTotal
}) => {
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [inCartLabel, setInCartLabel] = useState(false);

  
  const addProductToCart = async ({e, token, quantity, productId, price}) => {
    e.preventDefault();
    try {
      //adding to order_products (which gives us primaryId, orderId, productId, quantity, and price)
      //cart is an array of all of these order_products that share the same orderId
      if (token) {
        const data = await callApi({
          method: "POST",
          path: "/cart",
          token,
          body: { quantity, productId },
        });
        setCart((prev) => [data, ...prev]);
        setInCartLabel((prev) => !prev);
        setCartTotal( prev => prev + ((price/100) * quantity))
      } else {
        const product = await callApi({
          path: `/guest/products/${productId}`,
        });
        setGuestCart((prev) => [...prev, { ...product, quantity }]);
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
      });
    } else {
      guestCart.map((cartItem) => {
        if (product.id === cartItem.productId) {
          setInCartLabel(true);
        }
      });
    }
  }, [cart, guestCart]);

  console.log("cartTotal:", cartTotal);
    
    // const token = localStorage.getItem("token");
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
        <img
          className="picBorder"
          src={product.imageURL}
          width="300"
          height="300"
        ></img>
        <h3 className="productName">{product.name}</h3>
        {/* <h4>Inventory: {product.inventory}</h4> */}

        <h4 className="productPrice">{`$${product.priceInCents / 100}.00`}</h4>

        <div className="btn-toolbar">
          {isAdmin ? (
            <Button
              variant="secondary mx-2"
              onClick={() => {
                deleteProduct(product.id);
              }}
            >
              Delete
            </Button>
          ) : null}
          {isAdmin ? (
            <Button
              variant="primary"
              onClick={() => {
                setSelectedProduct(product);
                setShow(true);
              }}
            >
              Edit
            </Button>
          ) : null}
        </div>
        {inCartLabel ? (
          <p className="inCartLabel">Item is in cart</p>
        ) : (
          <div>
            <form className="productButtonsContainer">
              <select
                className="productButtons"
                onChange={(e) => setQuantity(e.target.value)}
              >
                <option>0</option>
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
                  addProductToCart({e, token, quantity, productId: product.id, price: product.priceInCents})
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
    
        <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Update Sticker</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <EditProductForm
                  product={selectedProduct}
                  isAdmin={isAdmin}
                  token={token}
                  setProducts={setProducts}
                  productToEdit={productToEdit}
                  onProductEditedHandler={onProductEdited}
                  error={error}
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
