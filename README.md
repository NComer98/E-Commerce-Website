# E-Commerce-Website
 
A project I designed to familiarize myself with modern web design using NodeJS, React, Express, Bootstrap, Axios, and mySQL. This website simulates an e-commerce dashboard. This readme covers the functionality of the site.

# Disclaimer

This project is not live on the internet, and is designed for use on my local machine. The website can be made to work with your local machine if you tinker with the index.js file in the back-end, but this repository is mainly intended to serve as a demonstration of my work through browsing the .js files and this readme.
<br /> <br />
Also, all the pages of my web-site use white as a background color, so I apologize for any eye-damage caused by the bright images to follow for dark-mode users.

# Log-in / Register

If the user is not signed-in, then they can only access the log-in and register pages. If the user attempts to access any other page through URL manipulation, they will be redirected to the register page. The navbar also reflects this initial state of access to the site, allowing only for traversal between these two pages.

<img src = "/demo/Register splash.png" />

The log-in page has basic form validation.

<img src = "/demo/Log-in verification.png" />

The log-in functionality uses JWT authentication with a bearer key. Hashed passwords are ideal in real-word scenarios, but weren't needed for the purposes of this project.

# Product List

The splash page of a logged-in user is the "product list", which features every product in the database displayed with a table.

<img src = "/demo/splash.png" />

Using bootstrap, this page is also mobile-friendly.

<img src = "/demo/mobile1.png" />

The navbar is also collapsable/extendable for smaller screens.

<img src = "/demo/mobile2.png" />

From this product list, the user has access to a variety of options to manipulate the database.

# Search

The user can search the product list using the search bar, which changes the display of the table in real-time thanks to React (every key input to the search bar refreshes the product list table).

<img src = "/demo/Search.png" />

The user can enter a product name, category, or company into the search bar; the search bar searches using all of these columns at once. This is done using OR statements in SQL.

<img src = "/demo/Search2.png" />

# Delete / Update Products

The user can click directly on any row in the product list table to make alterations to the database. They can instantly delete a product from the database using the "delete" button, which is reflected by the product list table display in real-time.

Users can also update products. Clicking on the update button will take the user to an update page which has basic form validation.

<img src = "/demo/update.png" />

# Add Product

The navbar can be used to navigate to the "add products" page. Here the user can input all the necessary information of the product into a form (which has basic form validation). The user's name is automatically attached to the product's entry in the database, as shown on the product list's "username" column.

<img src = "/demo/Add product.png" />

# Extra notes about the code

The navigation bar at the top of the web-page uses the "BrowserRouter", "Routes", and "Route" React components. Additionally, all of the web-pages are custom React components.
<br /> <br />
An Axios interceptor is used for JWT authentication on all pages that access the back-end database. This interceptor can be found in "/front-end/src/index.js".
