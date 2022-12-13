const express = require("express");
const bodyParser = require('body-parser');
require("./db/config");
const cors = require("cors");
//const session = require('express-session');
const path = require('path');
const { request } = require('http');
const { createConnection } = require("net");

const JWT = require('jsonwebtoken');
const JWTkey = 'e-comm';

const mysql = require('mysql');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecomm',
});

const app = express();
app.get("/",(req,resp) => {
    resp.send("app is working...");
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

// Test for select statement that shows all user information
app.get('/api/userlist', (req, res) => {
	const sqlSelect =
		"SELECT * FROM users";
	db.query(sqlSelect, (err, result) => {
		res.send(result);
	});
});

// Sign-up functionality
app.post('/api/signup', (req, res) => {
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	const sqlInsert = "INSERT INTO users (name, email, password) VALUES (?,?,?)";
	db.query(sqlInsert, [username, email, password], (err,res2) => {
		if (err) {res.send({err: err});}
		else {
			if(res2) {
				JWT.sign({ res2 }, JWTkey, {expiresIn: "2h"}, (err, token) => {
					res.send({result: {name: username, email:email}, auth:token});
			})}
			else {res.send({message: "Wrong username/password"});}
		}
	});
});

// Log-in
app.post("/api/login", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const sqlLogin =
		"SELECT name,email FROM users WHERE name LIKE ? AND password LIKE ?";
	
	db.query(sqlLogin, [username, password], (err, result) => {
		if (err) {res.send({err: err});}
		else {
			if (result) {
				JWT.sign({ result }, JWTkey, {expiresIn: "2h"}, (err, token) => {
					if(err) {res.send({result: "Error"})}
					res.send({ result, auth:token})
				})}
			else {res.send({message: "Wrong username/password"});}
		}
	});
});

// Add product
app.post("/api/add-product", (req, res) => {
	const prodName = req.body.prodName;
	const price = req.body.price;
	const brand = req.body.company;
	const category = req.body.category;
	const username = req.body.username;

	const sqlInsert = "INSERT INTO products (name, price, username, brand, category) VALUES (?,?,?,?,?)";
	db.query(sqlInsert, [prodName, price, username, brand, category], (err,res2) => {
		if (err) {res.send({err: err});}
		else {
			if (res) {res.send(res2);}
			else {res.send({message: "Add failed"});}
		}
	});
});

// Product list
app.get("/api/product-list", verifyToken, (req, res) => {
	const sqlSelect = "SELECT * from products";
	db.query(sqlSelect, (err, result) => {
		res.send(result);
	});
});

// Delete product
app.delete("/api/delete-prod/:id", (req, res) => {
	const product_id = req.params.id;
	const sqlDelete = "DELETE FROM products WHERE product_id = ?";

	db.query(sqlDelete, product_id, (err,res2) => {
		if (err) {res.send({err: err});}
		else {
			if (res) {res.send(res2);}
			else {res.send({message: "Delete failed"});}
		}
	});

});

// Get single product
app.get("/api/update/:id", (req, res) => {
	const product_id = req.params.id;
	const sqlSelect = "SELECT * FROM products WHERE product_id = ?";

	db.query(sqlSelect, product_id, (err, res2) => {
		if (err) {res.send({err: err});}
		else {
			if (res) {res.send(res2);}
			else {res.send({message: "Select failed"});}
		}
	});
});

// Update product
app.put("/api/update/:id",(req,res) => {
	const product_id = req.params.id;
	const prodName = req.body.prodName;
	const price = req.body.price;
	const brand = req.body.company;
	const category = req.body.category;
	//const username = req.body.username; //Use to authenticate updates later?
	//console.log(product_id);

	const sqlUpdate = "UPDATE products SET name = ?, price = ?, brand = ?, category = ? WHERE product_id = ?";

	db.query(sqlUpdate,[prodName, price, brand, category, product_id], (err, res2) => {
		if (err) {res.send({err: err});}
		else {
			if (res) {res.send(res2);}
			else {res.send({message: "Update failed"});}
		}
	});
});

// Search for product
app.get("/api/search/:key",(req, res)=> {
	//Use SQL "LIKE" and "OR" so that key can be name or company or category
	const key = req.params.key;

	const sqlSearch = "SELECT * FROM products WHERE name LIKE concat('%',?,'%') OR brand LIKE concat('%',?,'%') OR category LIKE concat('%',?,'%')";

	db.query(sqlSearch, [key,key,key], (err, res2) => {
		if (err) {res.send({err: err});}
		else {
			if (res) {res.send(res2);}
			else {res.send({message: "Search failed"});}
		} 
	})
});

function verifyToken(req, resp, next) {
	//console.log(req.headers['authorization']);
	let token = req.headers['authorization'];
	if(token){
		token = token.split(' ')[1];
		JWT.verify(token, JWTkey,(err, success)=> {
			if(err) {resp.status(401).send({result:"Invalid token."})}
			else {next();}
		})
	}
	else {
		resp.status(403).send({result: "No token."});
	}
}

app.listen(5000);