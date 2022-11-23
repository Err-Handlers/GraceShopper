import React, { useState } from 'react'
import { callApi } from '../api/utils'

const Pastries = ({pastries, setPastries, token, isAdmin}) => {
    
    const [quantity, setQuantity] = useState(0);
    const [cart, setCart] = useState([]);
    console.log('token :>> ', token);
    
    const submitHandler = async (e, pastryId, token) => {
        e.preventDefault();
        console.log('pastryId :>> ', pastryId);
        try {
            const data = await callApi({method: "POST", path: '/cart', token, body: {quantity, pastryId}})
            console.log('data :>> ', data);
            setCart( prev => [ data, ...prev])
            console.log('cart :>> ', cart);
        } catch (error) {
            console.log(error)
        }
    }
    
    // const token = localStorage.getItem("token");
    const deletePastry = async (pastryId) => {
        try {
            await callApi({
                method: "DELETE",
                path: `/pastries/${pastryId}`,
                token
        })
        setPastries(
            (prev) => 
        prev.filter((pastry) => pastryId !== pastry.id))

        }
        catch (error) {
            console.log(error)
        }
    }
    return (

    <>
        <center><h1>Pastries</h1></center>
        <div>
            {pastries.map((pastry) => {
                return (
                <div key={pastry.id}>
                    <img src={pastry.imageURL} width="400" height="400"></img>
                    <h4>Name: {pastry.name}</h4>
                    <h4>Description: {pastry.description}</h4>
                    <h4>Inventory: {pastry.inventory}</h4>
                    <h4>{`Price: $${pastry.priceInCents / 100}.00`}</h4>
                    {isAdmin ? <button onClick={()=>{deletePastry(pastry.id)}}>Delete</button> : null}
                    <form>
                        <select onChange={ e => setQuantity(e.target.value)}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                        </select>
                        <button onClick={(e) => submitHandler(e, pastry.id, token)}>Add</button>
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

export default Pastries

