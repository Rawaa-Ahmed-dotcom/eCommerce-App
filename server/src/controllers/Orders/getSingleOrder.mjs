import Order from "../../models/Order.mjs";

export const getSingleOrder = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id) res.status(400).json({msg : "Invalid ID"});
        const order = await Order.findById(id);
        if(!order) {
            return res.status(404).json({msg : "Order not found"});
        }
        return res.status(200).json({data : order});
    } catch (err) {
        return res.status(500).json({msg : err.message});
    }
}