import { useState, useEffect } from "react";
import { callApi } from "../api/utils";

const Users = () => {
    const [users, setUsers] = useState([])

    const fetchAllUsers = async () => {
    const data = await callApi({
        path: "/users"
    })
    setUsers(data);
    };
    
    useEffect(() => {
    fetchAllUsers();
    }, []);

    
    return (
        <div className="mainContainer">
            <div className="cartContainer">
            <center><h1 className="usersTitle">ALL ORDERS</h1></center>
            <div className="allOrderContainer">
                <div className="adminUserContainer">
                    <p className="orderId">UserId: 020</p>
                    <p>Order Id: 002</p>
                    <p>Email: MichaelScott@gmail.com</p>
                </div>
                <h4>Shipping Details</h4>
                <p>Michael Scott</p>
                <p>123 Dunder Mifflin Ave. </p>
                <p>Scranton, Pennsylvania 18503</p>
                <br></br>
                <br></br>
                <h4>Payment Details</h4>
                <p>Michael Scott</p>
                <p>123 Sesame St.</p>
                <p>Scranton, Pennsylvania 18503</p>
                <p>Card ending in: 1234</p>
                <br></br>
                <br></br>
                <h4>Items Ordered:</h4>
                <p>Popsicle (2) </p>
                <p>Sunny Side Up (1)</p>
            </div>
            <br></br>
            <br></br>
            <div className="allOrderContainer">
            <div className="adminUserContainer">
                    <p className="orderId">UserId: 010</p>
                    <p>Order Id: 001</p>
                    <p>Email: guest@gmail.com</p>
                </div>
                <h4>Shipping Details</h4>
                <p>Erin Guest</p>
                <p>123 Sesame St.</p>
                <p>San Francisco, California 94016</p>
                <br></br>
                <br></br>
                <h4>Payment Details</h4>
                <p>Erin Guest</p>
                <p>123 Sesame St.</p>
                <p>San Fancisco, California 94016</p>
                <p>Card ending in: 4321</p>
                <br></br>
                <br></br>
                <h4>Items Ordered:</h4>
                <p>Koi Fish (1) </p>
                <p>Ghost with Balloon (1)</p>
            </div>
            </div>
            {/* {users.map((user) => {
            return (
                <div className="card card-body w-75 mx-auto p-2 m-2" key={user.id}>
                <h4 className="text-muted">Email: {user.email}</h4>
                </div>
            );
            })} */}
        </div>
    )
}

export default Users;