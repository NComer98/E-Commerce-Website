import './App.css';
//import Axios from 'axios';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
//import UserList from './components/UserList';
import PrivateComponent from './components/PrivateComponent';
import LogIn from './components/LogIn';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateComponent from './components/UpdateComponent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent/>}>
            <Route path='/' element={<ProductList />} />
            <Route path='/add' element={<AddProduct />} />
            <Route path='/update/:id' element={<UpdateComponent />} />
            <Route path='/logout' element={<h1>Log Out Component</h1>} />
            <Route path='/profile' element={<h1>Profile Component</h1>} />
          </Route>
          <Route path = '/signup' element={<SignUp />} />
          <Route path = '/login' element={<LogIn />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
