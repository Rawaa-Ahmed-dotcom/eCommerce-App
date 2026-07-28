import Order from "../../models/Order.mjs";
import User from "../../models/User.mjs"

export const deleteAccount = async (req, res) => {
    try {
        await Order.updateMany({ userId: req.user.id }, { $set: { userId: null } })
        const deletedUser = await User.findByIdAndDelete(req.user.id);
        if (!deletedUser) {
        return res.status(404).json({ msg: "User not found" });
    }
        return res.status(200).json({msg : "Account Deleted Successfully!"});
    } catch (err) {
        return res.status(500).json({msg : err.message});
    }
}