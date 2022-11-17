import React from 'react'
import { callApi } from '../api/utils'

const Pastries = ({pastries, setPastries}) => {
    const token = localStorage.getItem("token");
    const deletePastry = async (pastryId) => {
        console.log(pastryId)
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
                    <button onClick={()=>{deletePastry(pastry.id)}}>Delete</button>
                    <br></br>
                </div>
                );
            })}
        </div>
    </>

    )
}

export default Pastries

