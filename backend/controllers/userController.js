import userModel from "../models/UserModel.js"
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const generatetoken=(id)=>{
 return jwt.sign({id},process.env.TOKEN_SECRET)
}

const userLogin=async(req,res)=>{
   try {
     const {email,password}=req.body;

     const user=await userModel.findOne({email});

     if(!user){
        res.json({success:false,message:"Email does not Exists"})
     }
     if (user){
        const isMatch= await bcrypt.compare(password,user.password);
    if(isMatch){
        const token =generatetoken(user._id)
        res.json({success:true,token})
    }
    else{
        res.json({success:false,message:"Password is invalid"})

    }
     }

   } catch (error) {
    res.json({success:false,message:error.message})

   }
}

const registerUser=async(req,res)=>{
try {
  
    const {name,email,password}=req.body;

    const exists=await userModel.findOne({email})

    if(exists){
        res.json({success:false,message:"Email already Exists"})
    }

    if(!validator.isEmail(email)){
        res.json({success:false,message:"Please enter a valid email"})
    }
    if(password.length<8){
        res.json({success:false,message:"Please enter strong password of 8 characters"})
    }

    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt)

    const newUser= new userModel(
        {
            name,
            email,
            password:hashedPassword
        }
    )
    const user = await newUser.save();

     const token =generatetoken(user._id);

     res.json({success:true,token})
    
} catch (error) {
    console.log(error)
    res.json({success:false,message:"could not add new user"})
}
}

const registerAdmin=async(req,res)=>{
try {
    const{email,password}=req.body;
    if(email==process.env.ADMIN_EMAIL && password== process.env.ADMIN_PASSWORD){
const token =jwt.sign(email+password,process.env.TOKEN_SECRET)
res.json({success:true,token})

    }
    else{
        res.json({success:false,message:"Invalid credentials"})

    }
} catch (error) {
    res.json({success:false,message:"could not add new user"})

}
}

export {userLogin,registerAdmin,registerUser}