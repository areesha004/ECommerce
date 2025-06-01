import orderModel from "../models/OrderModel.js";
import userModel from "../models/UserModel.js";

const PlaceOrders=async(req,res)=>{
try {
    const{items,address,amount}=req.body
const userId=req.userId;

const orderData={
    userId,
    items,
    address,
    amount,
    paymentMethod:"COD",
   payment:'false',
   date:Date.now()
}

const newOrder=new orderModel(orderData);
  await  newOrder.save();

  await userModel.findByIdAndUpdate(userId,{cartData:{}})
  res.json({success:"true",message:"Order Placed"})

} catch (error) {
    res.json({success:"false",message:error.message})
}

}

const PlaceOrderRazor=async(req,res)=>{
    try {
        const{items,address,amount}=req.body
    const userId=req.userId;
    
    const orderData={
        userId,
        items,
        address,
        amount,
        paymentMethod:"RAZOR",
       payment:'false',
       date:Date.now()
    }
    
    const newOrder=new orderModel(orderData);
      await  newOrder.save();
    
      await userModel.findByIdAndUpdate(userId,{cartData:{}})
      res.json({success:"true",message:"Order Placed"})
    
    } catch (error) {
        res.json({success:"false",message:error.message})
    }
    
}
const PlaceOrderStripe=async(req,res)=>{
    try {
        const{items,address,amount}=req.body
    const userId=req.userId;
    
    const orderData={
        userId,
        items,
        address,
        amount,
        paymentMethod:"STRIPE",
       payment:'false',
       date:Date.now()
    }
    
    const newOrder=new orderModel(orderData);
      await  newOrder.save();
    
      await userModel.findByIdAndUpdate(userId,{cartData:{}})
      res.json({success:"true",message:"Order Placed"})
    
    } catch (error) {
        res.json({success:"false",message:error.message})
    }
    
}
const AllOrders=async(req,res)=>{
    try {
      
          const response=await orderModel.find();
    
          res.json({success:"true",response})
        
        } catch (error) {
            res.json({success:"false",message:error.message})
        }
}
const userOrders=async(req,res)=>{
    try {
      
    const userId=req.userId;
      const response=await orderModel.find({userId});

      res.json({success:"true",response})
    
    } catch (error) {
        res.json({success:"false",message:error.message})
    }
    
}
const updateStatus = async (req, res) => {
    try {
      const { newStatus, orderId } = req.body;
  
      const response = await orderModel.findByIdAndUpdate(
       orderId,
        { status: newStatus },
        { new: true } 
      );
  
      if (!response) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }
  
      res.json({ success: true, message: "Status updated", response });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

export {PlaceOrderRazor,PlaceOrderStripe,PlaceOrders,updateStatus,AllOrders,userOrders}