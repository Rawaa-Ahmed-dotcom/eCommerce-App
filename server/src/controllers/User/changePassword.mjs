import User from "../../models/User.mjs";
import bcrypt from "bcrypt"
export const  changePassword = async (req,res) => {
    try {
        const {currentPassword , newPassword} = req.body;
        if(!currentPassword || !newPassword) {
            return res.status(400).json({msg : "Current password and new password are required"});
        }
        const user = await User.findById(req.user.id);
        const comparePass = await bcrypt.compare(currentPassword , user.password);
        if(!comparePass) {
            return res.status(400).json({msg : "Current password is wrong"});
        }
        user.password = newPassword;
        await user.save();
        const updatedUser = await User.findById(req.user.id).select("-password");
        return res.status(200).json({msg : "Password Changed Successfully" , user : updatedUser});
    }catch(err) {
        return res.status(500).json({msg : err.message});
    }
}