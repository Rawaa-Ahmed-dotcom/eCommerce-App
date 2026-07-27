import Order from "../../models/Order.mjs"

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        
        return res.status(200).json({ data: orders });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}