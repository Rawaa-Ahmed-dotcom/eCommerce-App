import Product from "../../models/Product.mjs";

export const getProducts = async (req, res) => {
    try {
        let finalQuery = {};

        if (req.query.keyword) {
            finalQuery.title = { $regex: req.query.keyword, $options: "i" };
        }

        Object.keys(req.query).forEach((key) => {
            const excluded = ["page", "sort", "limit", "keyword"];
            
            if (!excluded.includes(key)) {
                const value = req.query[key];
                const parsedValue = isNaN(value) ? value : Number(value);

                if (key.includes("[") && key.includes("]")) {
                    const parts = key.split(/[\[\]]/).filter(Boolean); 
                    const field = parts[0];       
                    const operator = `$${parts[1]}`; 

                    if (field === "price") {
                        if (!finalQuery.$or) finalQuery.$or = [];
                        
                        finalQuery.$or = [
                            { price: { [operator]: parsedValue } },
                            { salePrice: { [operator]: parsedValue } }
                        ];
                    } else {
                        if (!finalQuery[field]) finalQuery[field] = {};
                        finalQuery[field][operator] = parsedValue;
                    }
                } else {
                    finalQuery[key] = parsedValue;
                }
            }
        });
        const sortedBy = req.query.sort ? req.query.sort.split(",").join(" ") : "-createdAt";
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;
        
        const products = await Product.find(finalQuery).sort(sortedBy).skip(skip).limit(limit);
        if(products.length === 0) return res.status(404).json({msg : "Products Not Found"});
        return res.status(200).json({status : "Success" , data : products});
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}