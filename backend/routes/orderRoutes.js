
import {PlaceOrderRazor,PlaceOrderStripe,PlaceOrders,updateStatus,AllOrders,userOrders} from '../controllers/orderController.js'

import express from 'express'
import AuthCart from '../middleware/auth.js';
import adminAuth from '../middleware/AdminAuthority.js';
const orderRouter=express.Router();

orderRouter.post('/razor',AuthCart,PlaceOrderRazor);
orderRouter.post('/stripe',AuthCart,PlaceOrderStripe);
orderRouter.post('/cash',AuthCart,PlaceOrders)
orderRouter.get('/list',adminAuth,AllOrders)
orderRouter.get('/userOrders',AuthCart,userOrders)
orderRouter.post('/status',adminAuth,updateStatus)

export default orderRouter