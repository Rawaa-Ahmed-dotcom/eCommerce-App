import Category from "../models/Category.mjs";
export const generateProductSKU = async (brand, categoryId) => {
    try {
        if (!categoryId || categoryId.length !== 24) {
            return "GEN-PRD-" + Math.floor(100 + Math.random() * 900);
        }

        const category = await Category.findById(categoryId);
        const brandCode = brand ? String(brand).substring(0, 3).toUpperCase() : "GEN";
        const catCode = category && category.title ? String(category.title).substring(0, 3).toUpperCase() : "PRD";
        const randomNum = Math.floor(100 + Math.random() * 900);
        
        return `${brandCode}-${catCode}-${randomNum}`;
    } catch (err) {
        console.log("Error in SKU Generation:", err.message);
        return "GEN-PRD-" + Math.floor(100 + Math.random() * 900);
    }
};