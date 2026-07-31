export const adminMiddleware = async (req, res, next) => {

    if (req.user && req.user.role === "admin") {
        return next();
    }

    return res.status(403).json({ msg: "Access Denied: Admin resource only" });

} 