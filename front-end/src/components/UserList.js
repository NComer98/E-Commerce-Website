import Axios from "axios";
import React,{useEffect, useState} from "react";

const UserList = ()=> {
    const [userList, setUserList] = useState([]);
    
    useEffect(() => {
        Axios.get("http://localhost:5000/api/userlist").then((response) => {
            setUserList(response.data);
        })
    });

    return (
        userList.map((val) => {
            return <h1>Username: {val.name} | E-mail: {val.email} | Password: {val.password} </h1>
        })
    );
}

export default UserList;