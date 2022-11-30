import React, { useState } from 'react'
import { callApi } from '../api/utils'

const Products = ({products, setProducts, token, isAdmin, cart, setCart, quantity, setQuantity}) => {
    
    
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
    return (

    <>
        <img src="/assets/product_imgs/plantTrees.png" width="250" height ="250"></img>
        <div className="productsContainer">
            {products.map((product) => {
                return (
                <div className="singleProduct" key={product.id}>
                    <img src={product.imageURL} width="300" height="300"></img>
                    <h3 className='productName'>{product.name}</h3>
                    {/* <h4>Inventory: {product.inventory}</h4> */}
                    <h4 className='productPrice'>{`$${product.priceInCents / 100}.00`}</h4>
                    {isAdmin ? <button onClick={()=>{deleteProduct(product.id)}}>Delete</button> : null}
                    <form className='productButtonsContainer'>
                        <select className="productButtons" onChange={ e => setQuantity(e.target.value)}>
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
                );
            })}
        </div>
    </>

    )
}

export default Products;

