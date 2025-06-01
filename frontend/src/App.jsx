import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home';
import Collection from './pages/Collection'
import Navbar from './components/Navbar';
import About from './pages/About'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import Contact from './pages/Contact'
import Login from './pages/Login'
import PlaceOrders from './pages/PlaceOrders'
import Product from './pages/Product'
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  return (
    <div  className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer></ToastContainer>
      <Navbar></Navbar>
      <SearchBar></SearchBar>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/collection' element={<Collection/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/orders' element={<Orders/>}></Route>
        <Route path='/product/:productId' element={<Product/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/placeOrders' element={<PlaceOrders/>}></Route>  
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App

