import Axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    const getProducts =()=>{
        /*let config = {
            headers: {
              authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
          }*/
          
        Axios.get("http://localhost:5000/api/product-list/").then((response) => {
            setProducts(response.data);
        })
    }

    const deleteProduct= (id)=>{
        //console.log(id);
        Axios.delete(`http://localhost:5000/api/delete-prod/${id}`).then((response) => {
            //console.log(response);
            getProducts();
        })
    }

    useEffect(() => {
        getProducts();
    },[]);

    const searchHandle = (event) => {
        let key = event.target.value;
        if(key) {
            Axios.get(`http://localhost:5000/api/search/${key}`).then((response) => {
                console.log(response);
                if (response) {
                    setProducts(response.data);
                }
            })
        }
    }

    //console.log(products);

    return(
        <div className="container-fluid product-list">
            <h3>Product List</h3>
            <input type = "" className = 'search-product-box' placeholder = 'Search Product' onChange={searchHandle} />
            <ul className = "row product-header">
                <li className="col-sm">ID Number</li>
                <li className="col-sm">Product Name</li>
                <li className="col-sm">Price</li>
                <li className="col-sm">Username</li>
                <li className="col-sm">Brand / Company</li>
                <li className="col-sm">Category</li>
                <li className="col-sm">Operation</li>
            </ul>
            {
                products.map((item, index) => 
                    <ul className= "row" key={item.product_id}>
                        <li className="col-sm">{item.product_id}</li>
                        <li className="col-sm">{item.name}</li>
                        <li className="col-sm">{item.price}</li>
                        <li className="col-sm">{item.username}</li>
                        <li className="col-sm">{item.brand}</li>
                        <li className="col-sm">{item.category}</li>
                        <li className="col-sm"><button onClick={()=>{deleteProduct(item.product_id)}}>Delete</button>
                        <Link to = {"/update/"+item.product_id}>Update</Link>
                        </li>
                    </ul>
                )
            }
        </div>
    )
};

export default ProductList;