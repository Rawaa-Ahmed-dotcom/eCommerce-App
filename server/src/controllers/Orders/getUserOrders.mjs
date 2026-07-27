import Order from "../../models/Order.mjs";

export const getUserOrders = async(req,res) => {
    try {
        const user = req.user;
        if(!user) {
            return res.status(404).json({msg : "User not found"});
        }
        const orders = await Order.find({userId : user._id});
        return res.status(200).json({data : orders});
    }catch(err) {
        return res.status(500).json({msg : err.message});
    }
}