import Category from "../../models/Category.mjs";

export const deleteCategory = async(req,res) => {
    try {
        const {slug} = req.params;
        if(!slug || typeof slug !== "string") return res.status(400).json({msg : "Invalid Slug"});
        const deletedCategory = await Category.findOneAndDelete({slug});
        if(!deletedCategory) return res.status(404).json({msg : "Category not found"});
        return res.status(200).json({msg : "Successfully deleted category" , deletedCategory});
    }catch(error) {
        return res.status(500).json({msg : error.message});
    }
}