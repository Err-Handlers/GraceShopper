import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Product from "./Product";

const Products = ({
  token,
  isAdmin,
  cart,
  setCart,
  setProducts,
  products,
  fetchProducts,
  guestCart,
  setGuestCart,
  error,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const productMatches = (product) => {
    const textToCheck = (product.name + product.description).toLowerCase();
    return textToCheck.includes(searchValue.toLowerCase());
  };

  const filteredProducts = products.filter((product) => {
    return productMatches(product);
  });

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
      <div className="productsContainer">
        {filteredProducts.map((product) => {
          return (
            <Product
              token={token}
              isAdmin={isAdmin}
              cart={cart}
              setCart={setCart}
              products={products}
              setProducts={setProducts}
              fetchProducts={fetchProducts}
              product={product}
              key={product.id}
              guestCart={guestCart}
              setGuestCart={setGuestCart}
              error={error}
            />
          );
        })}
      </div>
    </>
  );
};

export default Products;
