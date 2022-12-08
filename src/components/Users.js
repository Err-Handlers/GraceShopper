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
        <div className="">
            <center><h1 className="usersTitle">User Info</h1></center>
            {users.map((user) => {
            return (
                <div className="card card-body w-75 mx-auto p-2 m-2" key={user.id}>
                <h4 className="text-muted">Email: {user.email}</h4>
                </div>
            );
            })}
        </div>
    )
}

export default Users;