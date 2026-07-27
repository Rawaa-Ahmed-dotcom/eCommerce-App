import Product from "../../models/Product.mjs";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {

        const { sort, page, price, keyword, limit, ...otherFilters } = req.query;
        const parsedPage = Number(page) || 1;
        const parsedLimit = Number(limit) || 6;
        const skip = (parsedPage - 1) * parsedLimit;

        const pipeline = [];


        pipeline.push({
            $addFields: {
                finalPrice: {
                    $cond: {
                        if: { $and: [{ $ne: ["$salePrice", null] }, { $gt: ["$salePrice", 0] }] },
                        then: "$salePrice",
                        else: "$price"
                    }
                }
            }
        });



        const matchStage = {};
        if (price) {
            const minPrice = price.min ? Number(price.min) : 0;
            const maxPrice = price.max ? Number(price.max) : Infinity;
            matchStage.finalPrice = { $gte: minPrice, $lte: maxPrice };
        }
        if (keyword) {
            matchStage.title = { $regex: keyword, $options: "i" };
        }
        Object.keys(otherFilters).forEach((key) => {
            const value = otherFilters[key];
            if (key === "category" && mongoose.Types.ObjectId.isValid(value)) {
                matchStage[key] = new mongoose.Types.ObjectId(value);
            } else {
                matchStage[key] = isNaN(value) ? value : Number(value);
            }
        });
        if (Object.keys(matchStage).length > 0) {
            pipeline.push({ $match: matchStage });
        }
        pipeline.push({
            $facet: {
                metaData: [{ $count: "filteredProductsCount" }],
                data: [
                    {
                        $sort:
                            sort === "price" ? { finalPrice: 1 } : sort === "-price" ? { finalPrice: -1 } : { createdAt: -1 }
                    },
                    {
                        $skip: skip
                    },
                    {
                        $limit: parsedLimit
                    }
                ]
            }
        });
        const result = await Product.aggregate(pipeline);
        const products = result[0].data;
        const filteredProductsCount = result[0].metaData[0]?.filteredProductsCount || 0;
        const totalProductsCount = await Product.countDocuments({});
        return res.status(200).json({
            msg: "Success",
            data: products,
            totalProductsCount,
            filteredProductsCount
        })

    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
}