import userModel from "../models/UserModel.js"

const addToCart=async(req,res)=>{
try {
    const { itemId, size } = req.body;
    const userId = req.userId; 
    const userData=await userModel.findById(userId);
    let cartData=await userData.cartData;

    if (cartData[itemId]) {
        if (cartData[itemId][size]) {
            cartData[itemId][size] += 1;
        } else {
            cartData[itemId][size] = 1;
        }
    } else {
        cartData[itemId] = {};
        cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId,{cartData})
    res.json({success:true,message:"Added to cart"})



} catch (error) {
    res.json({success:false,message:error.message})
}
}

const updateToCart=async(req,res)=>{
    try {
        const { itemId, size } = req.body;
        const userId = req.userId; 
        const userData=await userModel.findById(userId);
        let cartData=await userData.cartData;
        if (cartData[itemId]) {
            delete cartData[itemId][size];
            const remainingSizes = Object.keys(cartData[itemId]);
            if (remainingSizes.length === 0) {
                delete cartData[itemId];
            }
         }  
         await userModel.findByIdAndUpdate(userId,{cartData})
         res.json({success:true,message:"Updated to cart"})
     
    } catch (error) {
        res.json({success:false,message:error.message})
    }

}
const getCartItems=async(req,res)=>{
try {
    const userId=req.userId
    const userData=await userModel.findById(userId);
    let cartData=await userData.cartData;

    res.json({success:true,cartData:userData.cartData})


} catch (error) {
    res.json({success:false,message:error.message})
}
}
export {addToCart,updateToCart,getCartItems}