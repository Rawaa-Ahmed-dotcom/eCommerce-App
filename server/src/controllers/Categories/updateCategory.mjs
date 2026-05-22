
import cloudinary from "../../config/cloudinary.mjs";
import Category from "../../models/Category.mjs";
import slugify from "slugify";


export const updateCategory = async (req, res) => {
    try {
        const { slug } = req.params;
        if(!slug || typeof slug !== "string") return res.status(400).json({msg : "Invalid slug"});
        const target = await Category.findOne({slug});
        if(!target) return res.status(404).json({msg : "Category not found"});

        const updateData = {...req.body };
        if(req.body.title) {
            const slug = slugify(req.body.title , {
                replacement : "-",
                strict : true,
                lower : true,
                trim : true
            });
            updateData.slug = slug;
        }
        if(req.file){
            if(target.img && target.img.public_id) {
                await cloudinary.uploader.destroy(target.img.public_id);
            }
            updateData.img = {
                url : req.file.path,
                public_id : req.file.filename
            }
        }
        
        const updatedCategory = await Category.findOneAndUpdate({slug} , {$set : updateData} , {new : true , runValidators : true});
        return res.status(200).json({msg : "Successfully updated category" , updatedCategory});

    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}