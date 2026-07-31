import mongoose from "mongoose";
import Order from "../../models/Order.mjs";
export const getUserOrders = async (req, res) => {
    try {
        const { status } = req.query;

        if (!req.user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const filter = {
            userId: new mongoose.Types.ObjectId(req.user.id),
        };

        if (status) {   
            filter.status = status;
        }

        const orders = await Order.find(filter);
        const filteredOrdersCount = await Order.countDocuments(filter);

        return res.status(200).json({ data: orders, count: filteredOrdersCount });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};