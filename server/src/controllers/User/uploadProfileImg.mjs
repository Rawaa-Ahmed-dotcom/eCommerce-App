import User from "../../models/User.mjs";
import cloudinary from "../../config/cloudinary.mjs";
export const uploadProfilePic = async (req, res) => {
    try {
        const { phone } = req.query;
        if (!req.file) {
            return res.status(400).json({ msg: "Please Upload an image" });
        }
        
        const user = await User.findById(req.user.id);
        
        if (user.profileImg?.public_id) {
            await cloudinary.uploader.destroy(user.profileImg?.public_id);
        }
        
        user.profileImg = {
            url : req.file?.path,
            public_id : req.file?.fieldname
        };
        await user.save({validateModifiedOnly : true});
        
        console.log(user);
        return res.status(200).json({msg : "Image Uploaded successfully!" , url : req.file?.path});
    } catch (err) {
     
        console.log(err.message);
        return res.status(500).json({msg : err.message});
    }
}