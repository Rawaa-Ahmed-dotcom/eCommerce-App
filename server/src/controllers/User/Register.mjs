import User from "../../models/User.mjs";
import jwt from "jsonwebtoken";

export const handleRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }
        const existed = await User.findOne({ email});
        if(existed) {
            return res.status(400).json({msg : "User Already Exists"});
        } 
        const user = await User.create({ username, email, password });
        const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
        
        res.cookie("refreshToken" , refreshToken , {
            maxAge : 7 * 24 * 60 * 60 * 1000,
            httpOnly : true,
            secure : process.env.NODE_ENV === "production"
        })
        return res.status(201).json({msg : "User Created Successfully" , accessToken , role : user.role})
    } catch (err) {
        return res.status(500).json({ msg: err?.message });
    }
}