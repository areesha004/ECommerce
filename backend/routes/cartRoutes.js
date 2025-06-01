import {addToCart,updateToCart,getCartItems}  from '../controllers/cartController.js'
import express from 'express'
import AuthCart from '../middleware/auth.js';
const cartRouter=express.Router();

cartRouter.post('/add',AuthCart,addToCart);
cartRouter.post('/update',AuthCart,updateToCart);
cartRouter.get('/data',AuthCart,getCartItems)

export default cartRouter