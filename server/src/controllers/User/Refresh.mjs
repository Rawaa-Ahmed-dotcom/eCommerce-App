import jwt from "jsonwebtoken";
import User from "../../models/User.mjs";
export const handleRefresh = async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    console.log(refreshToken);
    if (!refreshToken) {
        return res.status(401).json({ msg: "Refresh Token missing , Please Login Again" });
    }

    try {
        const decoded = jwt.verify(refreshToken , process.env.JWT_REFRESH_SECRET);
        console.log(decoded.id);
        const user = await User.findById(decoded.id);
        console.log(user);
        const validatedUser = {
            id : user._id,
            email : user.email,
            role : user.role,
            username : user.username
        }
        const accessToken = jwt.sign({id : decoded.id} , process.env.JWT_SECRET, {expiresIn : "15m"});
        return res.status(200).json({accessToken , user : validatedUser });
    } catch (err) {
        return res.status(403).json({ msg: "Invalid or Expired refresh Token!" });
    }
}