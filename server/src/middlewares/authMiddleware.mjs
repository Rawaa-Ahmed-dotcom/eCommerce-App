import jwt from "jsonwebtoken";
import User from "../models/User.mjs";

export const authMiddleWare = async (req, res, next) => {
    try {
        const accessToken = req.headers.authorization;
        if (accessToken && accessToken.startsWith("Bearer")) {
            const token = accessToken.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id).select("-password");
            if (!user) {
                return res.status(401).json({ msg: "User Not Found" });
            }
            req.user = user;
            return next();
        }
        else {
            return res.status(401).json({ msg: "Access Denied : No token provided" });
        }


    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ msg: "Unauthorized : Token has expired" });
        }
        if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ msg: "Unauthorized : Invalid token" })
        }
        return res.status(500).json({ msg: err.message });
    }
}