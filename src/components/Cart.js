import { callApi } from "../api/utils";
import { useEffect } from "react";

export default function cart ({token}){
 
    try {
        const fetchCart = async () => {
            const data = await callApi({ path: "/cart", token})
        }
        useEffect( () => {
        fetchCart()
        }, [])
    } catch (error) {
        setError(error)
        console.log(error)
    }

    
    return(
        <h1>Cart</h1>
    )
}