import React from 'react'

const Pastries = ({pastries}) => {
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
                    <br></br>
                </div>
                );
            })}
        </div>
    </>

    )
}

export default Pastries

