import Product from "../../models/Product.mjs";

export const getSingleProduct = async(req,res) => {
    try {
        const {slug} = req.params;
        if(!slug || typeof slug !== "string" || !isNaN(Number(slug))) {
            return res.status(400).json({msg : "Invalid Slug"});
        }
        const product = await Product.findOne({slug});
        if(!product) {
            return res.status(404).json({msg : "Product Not found"});
        }
        return res.status(200).json(product);
    }catch(err) {
        return res.status(500).json({msg : err.message});
    }
} 