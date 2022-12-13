import Axios from "axios";
import React,{useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';

const SignUp = ()=> {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
        const auth = localStorage.getItem('user');

        if(auth)
            {navigate('/');}
    },[]); //The empty square brackets ensure this gets called only once (unless values change?)

    const submitInfo = ()=>{
        Axios.post("http://localhost:5000/api/signup/", {username: name, email: email, password: password}).then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data.result));
            localStorage.setItem("token", JSON.stringify(response.data.auth));
            navigate('/');
        })

        navigate('/');
    };

    return (
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text" placeholder="Enter Name" value = {name} onChange={(event)=>setName(event.target.value)} />
            <input className="inputBox" type="text" placeholder="Enter Email" value = {email} onChange={(event)=>setEmail(event.target.value)}/>
            <input className="inputBox" type="password" placeholder="Enter Password" value = {password} onChange={(event)=>setPassword(event.target.value)}/>
            <button className="appButton" type="button" onClick={submitInfo}>Sign-up</button>
        </div>
    );
}

export default SignUp;