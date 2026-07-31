import mongoose from "mongoose";
import Order from "../../models/Order.mjs"

export const getOrderStatusCounts = async (req, res) => {
    try {
        const counts = await Order.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(req.user.id) } },
            {
                $group:
                {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }

        ]);
        const result = {
            All: 0,
            Delivered: 0,
            Shipped: 0,
            Cancelled: 0,
            Pending: 0
        }

        counts.forEach((item) => {
            result[item._id] = item.count;
            result.All += item.count;
        });
        return res.status(200).json(result);
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}