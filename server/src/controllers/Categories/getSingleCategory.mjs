import Category from "../../models/Category.mjs";
export const getSingleCategory = async(req,res) => {
    try {
        const {slug} = req.params;
        if(!slug || typeof slug !== "string" || !isNaN(Number(slug))) res.status(400).json({msg : "Slug must be string"});
        const targetCategory = await Category.find({slug});
        if(!targetCategory) res.status(404).json({msg : "Category Not Found"});
        return res.status(200).json({status : "Success" , category : targetCategory});
    }catch(err) {
        return res.status(500).json({msg : err.message});
    }
}