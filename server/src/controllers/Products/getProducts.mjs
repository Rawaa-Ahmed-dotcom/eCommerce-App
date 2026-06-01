import Product from "../../models/Product.mjs";

export const getProducts = async (req, res) => {
    try {
        
        let finalQuery = {};
        const { price, page, keyword, sort, limit, ...otherFilters } = req.query;
        if (keyword) {
            finalQuery.title = { $regex: req.query.keyword, $options: "i" };
        }
        if (price) {
            const minPrice = price.min ? Number(price.min) : 0;
            const maxPrice = price.max ? Number(price.max) : Infinity;

            finalQuery.$or = [
                {
                    salePrice: { $exists: true, $ne: null, $gt: 0, $gte: minPrice, $lte: maxPrice }
                },
                {
                    $or: [
                        { salePrice: { $exists: false } },
                        { salePrice: null },
                        { salePrice: 0 }
                    ],
                    price: { $gte: minPrice, $lte: maxPrice }
                }
            ]
        }
        Object.keys(otherFilters).forEach(key => {
            console.log(key);
            const value = otherFilters[key];
            const parsedValue = isNaN(value) ? value : Number(value);
            finalQuery[key] = parsedValue;
        })
        let sortedBy = {};
        console.log("sort", sort);
        if (sort?.includes("price")) {
            if (sort === "price") sortedBy = { price: 1 };
            if (sort === "-price") sortedBy = {  price: -1 };
        }
        console.log(sortedBy);
        const parsedPage = Number(page) || 1;
        const parsedLimit = Number(limit) || 10;
        const skip = (parsedPage - 1) * parsedLimit;
        console.log("finalQuery",finalQuery);
        const totalProducts = await Product.countDocuments({});
        const filteredProductsCount = await Product.countDocuments(finalQuery);
        const products = await Product.find(finalQuery).sort(sortedBy).skip(skip).limit(parsedLimit);


        return res.status(200).json({ status: "Success", data: products, totalProducts, filteredProductsCount });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}