export const handleLogout = async (req, res) => {
    try {
        const refreshToken = req.headers?.cookie;
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        });
        return res.status(200).json({msg : "Log Out Successfully"});
    } catch (err) {
        return res.status(500).json({msg : err.message});
    }
}