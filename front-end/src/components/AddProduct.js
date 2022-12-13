import Axios from "axios";
import React from "react";
import {useNavigate} from 'react-router-dom';

const AddProduct = () => {
    const [prodName, setProdName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);
    const navigate = useNavigate();

    const addProduct = ()=> {
        if (!prodName || !price || !company || !category)
        {
            setError(true);
            return false;
        }

        const username = JSON.parse(localStorage.getItem('user')).name;

        Axios.post("http://localhost:5000/api/add-product/", {prodName: prodName, price: price, username: username, category: category, company: company}).then((response) => {
            console.log(response);
            navigate('/');
        })
    };

    return(
        <div className = 'product'>
            <h1>Add Product</h1>
            <input type = 'text' placeholder="Enter Product Name" className="inputBox" onChange={(e)=>{setProdName(e.target.value)}} value = {prodName}/>
            {error &&  !prodName && <span className="invalid-input">Enter valid name</span>}

            <input type = 'text' placeholder="Enter Product Price" className="inputBox" onChange={(e)=>{setPrice(e.target.value)}} value = {price}/>
            {error &&  !price && <span className="invalid-input">Enter valid price</span>}

            <input type = 'text' placeholder="Enter Product Category" className="inputBox" onChange={(e)=>{setCategory(e.target.value)}} value = {category}/>
            {error &&  !category && <span className="invalid-input">Enter valid category</span>}

            <input type = 'text' placeholder="Enter Product Company" className="inputBox" onChange={(e)=>{setCompany(e.target.value)}} value = {company}/>
            {error &&  !company && <span className="invalid-input">Enter valid company</span>}

            <button className="appButton" onClick={addProduct}>Submit</button>
        </div>
    )
};

export default AddProduct;