import Category from "../../models/Category.mjs";

export const getAllCategories = async (req, res) => {
    try {
        const finalQuery = {};
        if (req.query.keyword) {
            finalQuery.title = { $regex: req.query.keyword, $options: "i" };
        }
        Object.keys(req.query).forEach((key) => {
            const excluded = ["page", "limit", "sort", "keyword"];
            if (!excluded.includes(key)) {

                const value = req.query[key];
                finalQuery[key] = isNaN(value) ? value : Number(value);

            }

        })
        const sortedBy = req.query.sort ? req.query.sort.split(",").join(" ") : '-createdAt';
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;

        const Categories = await Category.find(finalQuery).sort(sortedBy).skip(skip).limit(limit);
        if (Categories.length === 0) {
            return res.status(404).json({ msg: "No  Matched Categories" });
        }
        return res.status(200).json({ status: "Success", total: Categories.length, data: Categories });
    } catch (err) {
        return res.status(500).send({ "msg": err.message });
    }
}