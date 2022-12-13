import Axios from "axios";
import React, { useEffect } from "react";
import {useNavigate, useParams} from 'react-router-dom';

const UpdateComponent = () => {
    const [prodName, setProdName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false);
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        getProductDetails();
    },[]);

    const getProductDetails = () => {
        Axios.get(`http://localhost:5000/api/update/${params.id}`).then((response) => {
            //console.log(response.data);
            setProdName(response.data[0].name);
            setPrice(response.data[0].price);
            setCompany(response.data[0].brand);
            setCategory(response.data[0].category);
        });
    }

    const updateProduct = (id)=> {
        if (!prodName || !price || !company || !category)
        {
            setError(true);
            return false;
        }

        const username = JSON.parse(localStorage.getItem('user')).name;

        Axios.put(`http://localhost:5000/api/update/${id}`, {prodName: prodName, price: price, username: username, category: category, company: company}).then((response) => {
            //console.log(response);
            navigate('/');
        });
    };

    return(
        <div className = 'product'>
            <h1>Update Product</h1>
            <input type = 'text' placeholder="Enter Product Name" className="inputBox" onChange={(e)=>{setProdName(e.target.value)}} value = {prodName}/>
            {error &&  !prodName && <span className="invalid-input">Enter valid name</span>}

            <input type = 'text' placeholder="Enter Product Price" className="inputBox" onChange={(e)=>{setPrice(e.target.value)}} value = {price}/>
            {error &&  !price && <span className="invalid-input">Enter valid price</span>}

            <input type = 'text' placeholder="Enter Product Category" className="inputBox" onChange={(e)=>{setCategory(e.target.value)}} value = {category}/>
            {error &&  !category && <span className="invalid-input">Enter valid category</span>}

            <input type = 'text' placeholder="Enter Product Company" className="inputBox" onChange={(e)=>{setCompany(e.target.value)}} value = {company}/>
            {error &&  !company && <span className="invalid-input">Enter valid company</span>}

            <button className="appButton" onClick={() => {updateProduct(params.id)}}>Submit</button>
        </div>
    )
};

export default UpdateComponent;