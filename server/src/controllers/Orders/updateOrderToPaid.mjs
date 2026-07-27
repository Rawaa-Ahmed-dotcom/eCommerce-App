import Order from "../../models/Order.mjs";

export const updateOrderToPaid = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ msg: "Order Not Found" });
        }
        order.isPaid = true;
        order.paidAt = Date.now();
        const updatedOrder = await order.save();
        return res.status(200).json({ msg: "Order Updated Successfully!", data: updatedOrder });
    } catch (err) {
        return res.status(500).json({msg : err.message});
    }
}