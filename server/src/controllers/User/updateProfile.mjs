import User from "../../models/User.mjs";

export const updateProfile = async (req, res) => {
    console.log(req.body?.phone);
    try {
        const { phone, username } = req.body;
        if (!phone) {
            return res.status(400).json({ msg: "Enter your phone number" });
        }

        const user = await User.findById(req.user.id);
        if (username) {
            user.username = username;
        }
        user.phone = phone;
        console.log("before save call");
        await user.save();
        console.log("after save call - success");
        return res.status(200).json({ msg: "profile updated Successfully" });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}