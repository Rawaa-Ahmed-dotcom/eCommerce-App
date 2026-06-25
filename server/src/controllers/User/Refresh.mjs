import jwt from "jsonwebtoken";

export const handleRefresh = async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ msg: "Refresh Token missing , Please Login Again" });
    }

    try {
        const decoded = jwt.verify(refreshToken , process.env.JWT_REFRESH_SECRET);
        const accessToken = jwt.sign({id : decoded.id} , process.env.JWT_SECRET, {expiresIn : "15m"});
        return res.status(200).json({accessToken});
    } catch (err) {
        return res.status(403).json({ msg: "Invalid or Expired refresh Token!" });
    }
}