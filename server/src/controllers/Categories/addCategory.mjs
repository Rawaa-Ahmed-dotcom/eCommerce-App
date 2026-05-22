import cloudinary from "../../config/cloudinary.mjs";
import Category from "../../models/Category.mjs";
import slugify from "slugify";


export const createCategory = async (req, res) => {
    try {
        const title = req.body?.title;
        const description = req.body?.description;
        console.log(title);
        const slug = slugify(title, {
            replacement: '-',  
            strict: true, 
            lower: true, 
            trim : true     
        })
        
        const existedCategory = await Category.findOne({ slug });
        if (existedCategory) {
            return res.status(400).send({ "msg": "Category Already exists" });
        }
        const newCategory = await Category.create({ 
            title,
            description, 
            img : {
                url : req.file.path,
                public_id : req.file.filename
            } , 
            slug });
        return res.status(201).send({ "msg": "Category Successfully Added", newCategory });
    } catch (err) {
        return res.status(500).send({ "msg": err.message });
    }
}
