
import  jwt  from 'jsonwebtoken';
const AuthCart=async (req,res,next)=>{

    try {
        const{token}=req.headers
    if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    const token_decode=jwt.verify(token,process.env.TOKEN_SECRET);
    req.userId = token_decode.id 
    next();

    } catch (error) {
        return res.json({success:false,message:error.message})
    }
    
}
export default AuthCart