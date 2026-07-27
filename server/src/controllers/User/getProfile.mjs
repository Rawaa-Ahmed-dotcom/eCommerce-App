import User from "../../models/User.mjs"

export const getProfile = async (req,res) => {
    try {
        const user = await User.findById(req.user.id);
        if(!user) {
            return res.status(404).json({msg : "User Not Found"});
        }
        const validatedUser = {
            username : user.username,
            email : user.email,
            phone : user.phone,
            profileImg : user.profileImg?.url,
            role : user.role
        }
        return res.status(200).json({user : validatedUser});
    }catch(err) {
        return res.status(500).json({msg : err.message});
    }
}