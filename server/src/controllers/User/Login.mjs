import User from "../../models/User.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Email and password are required" });
        }
        const existed = await User.findOne({ email });
        if (!existed) {
            return res.status(400).json({ msg: "Invalid Credentials!" });
        }
        const comparedPassword = await bcrypt.compare(password, existed.password);
        if (!comparedPassword) {
            return res.status(400).json({ msg: "Invalid Credentials!" });
        }
        const accessToken = jwt.sign({ id: existed._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ id: existed._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
        res.cookie(
            "refreshToken",
            refreshToken,
            {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                secure: process.env.NODE_ENV === "production",
                httpOnly: true
            });
        const user =  {
            id: existed._id,
            username: existed.username,
            email: existed.email,
            role : existed.role
        };
        return res.status(200).json({ msg: "Valid Credentials!", accessToken, user});
    } catch (err) {
        return res.status(500).json({ msg: err?.message });
    }
}