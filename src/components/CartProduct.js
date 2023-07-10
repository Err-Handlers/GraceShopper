import { callApi } from "../api/utils";

const CartProduct = ({
  productInCart,
  productInGuestCart,
  token,
  cart,
  setCart,
  cartProducts,
  setCartProducts,
  setGuestCart,
}) => {
  const quantityUpdateHandler = async ({
    token,
    quantity,
    productId,
    orderId,
  }) => {
    try {
      if (token) {
        const updateQuantity = await callApi({
          method: "PATCH",
          path: "/cart",
          token,
          body: { quantity, productId, orderId },
        });
        setCartProducts((prev) =>
          prev.map((p) => {
            if (p.productId === productId) {
              const test = { ...p, quantity: Number(quantity) };
              return test;
            }
            return p;
          })
        );
        return updateQuantity;
      } else {
        setGuestCart((prev) =>
          prev.map((p) => {
            if (p.id === productId) {
              return { ...p, quantity };
            }
            return p;
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async ({ token, productId, orderId }) => {
    try {
      if (token) {
        const deleteProduct = await callApi({
          method: "DELETE",
          path: "/cart",
          token,
          body: { productId, orderId },
        });
        if (deleteProduct) {
          setCartProducts((prev) =>
            prev.filter((p) => p.productId !== productId)
          );
          setCart((prev) => prev.filter((p) => p.productId !== productId));
        }
        return cartProducts;
      } else {
        setGuestCart((prev) => prev.filter((p) => p.productId !== productId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {token ? (
        <div key={productInCart.id} className="singularCartProduct">
          <div className="nameAndPhoto">
            <img src={productInCart.imageURL} width="100" height="100"></img>
            <h4 className="cartProductName">{productInCart.name}</h4>
          </div>
          <select
            defaultValue={productInCart.quantity}
            className="productQuantity"
            onChange={(e) =>
              quantityUpdateHandler({
                token,
                quantity: e.target.value,
                productId: productInCart.productId,
                orderId: cart[0].orderId,
              })
            }
          >
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </select>
          <p className="cartProductPrice">
            ${(productInCart.priceInCents / 100) * productInCart.quantity}.00{" "}
            <span className="pricePerQuantity">
              (${productInCart.priceInCents / 100}.00 each)
            </span>
          </p>
          <p
            className="cartDeleteButton"
            onClick={() =>
              deleteHandler({
                token,
                productId: productInCart.productId,
                orderId: cart[0].orderId,
              })
            }
          >
            X
          </p>
        </div>
      ) : (
        <div key={productInGuestCart.id} className="singularCartProduct">
          <div className="nameAndPhoto">
            <img
              src={productInGuestCart.imageURL}
              width="100"
              height="100"
            ></img>
            <h4 className="cartProductName">{productInGuestCart.name}</h4>
          </div>
          <select
            className="productQuantity"
            defaultValue={productInGuestCart.quantity}
            onChange={(e) =>
              quantityUpdateHandler({
                quantity: e.target.value,
                productId: productInGuestCart.id,
              })
            }
          >
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
          </select>
          <p className="cartProductPrice">
            $
            {(productInGuestCart.priceInCents / 100) *
              productInGuestCart.quantity}
            .00{" "}
            <span className="pricePerQuantity">
              (${productInGuestCart.priceInCents / 100}.00 each)
            </span>
          </p>
          <p
            className="cartDeleteButton"
            onClick={() => deleteHandler({ productId: productInGuestCart.id })}
          >
            X
          </p>
        </div>
      )}
    </div>
  );
};

export default CartProduct;
