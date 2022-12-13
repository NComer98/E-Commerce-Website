import Axios from "axios";
import React,{useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';

const LogIn = ()=> {
    const [username, setUsername] = useState('');
    const [password,setPassword] = useState('');
    
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');

        if(auth)
            {navigate('/');}
    },[]);
    
    const handleLogin = ()=>{
        Axios.post("http://localhost:5000/api/login/", {username: username, password: password}).then((response) => {
            if (response.data.result[0]) {
                //console.log(response);
                localStorage.setItem("user", JSON.stringify(response.data.result[0]));
                localStorage.setItem("token", JSON.stringify(response.data.auth));
                navigate('/');
            } else {
                alert("Incorrect details");
            }
        })
    };

    return(
        <div className='register'>
            <h1>Log-in</h1>
            <input className = "inputBox" type = "text" placeholder='Enter Username' onChange={(e)=>setUsername(e.target.value)} ></input>
            <input className = "inputBox" type = "password" placeholder='Enter Password' onChange={(e)=>setPassword(e.target.value)}></input>
            <button className="appButton" type="button" onClick={handleLogin}>Log-In</button>
        </div>
    );
};

export default LogIn;