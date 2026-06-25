import Cart from "../../models/Cart.mjs";

export const getCartItems = async (req, res) => {
    try {
        const {_id} = req.user;
        const items = await Cart.findOne({userId : _id});
        if(items.length == 0) {
        
            return res.status(200).json({msg : "Your Cart is Empty"});
        }
        return res.status(200).json({items});
    }catch(err) {
        return res.status(500).json({msg : err.message});
    }
}