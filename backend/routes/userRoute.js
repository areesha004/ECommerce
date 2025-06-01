import express from 'express'
import { userLogin,registerAdmin,registerUser } from '../controllers/userController.js'


const userRouter=express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',userLogin)
userRouter.post('/admin',registerAdmin);

export default userRouter