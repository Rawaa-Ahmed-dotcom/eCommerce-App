import Category from "../../models/Category.mjs";
import Product from "../../models/Product.mjs";
import { generateProductSKU } from "../../utils/generateSKU.mjs";
import slugify from "slugify";
export const addProduct = async (req, res) => {
    try {
        console.log(req.body);
        const productSku = await generateProductSKU(req.body.brand, req.body.category);
        let parsedVariants = [];
        if (req.body.variants) {
            const variants = typeof req.body.variants === "string" ? JSON.parse(req.body.variants) : req.body.variants;
            parsedVariants = variants.map((v) => {
                const size = v.size.toUpperCase();
                const color = v.color.name.substring(0, 3).toUpperCase();

                return {
                    ...v,
                    size,
                    sku: `${productSku}-${color}-${size}`
                }
            })
        }

        const uniqueColors = [...new Set(parsedVariants.map(v => v.color.name.toLowerCase().trim()))];
        if (!req.files || !req.files.length) {
            return res.status(400).json({ msg: `You must upload images for these colors ${uniqueColors.join(", ")} ` });
        }
        const imagesData = req.files.map((file, index) => {
            return {
                url: file.path,
                public_id: file.filename,
                alt: `${req.body.title} - ${file.filename}`,
                color: uniqueColors[index] || uniqueColors[0],
                isPrimary: index === 0
            }
        })
        const slug = slugify(req.body.title, {
            replacement: "-",
            lower: true,
            trim: true
        })
        const newProductData = {
            ...req.body,
            variants: parsedVariants,
            slug,
            sku: productSku,
            price: Number(req.body.price),
            salePrice: req.body.salePrice ? Number(req.body.salePrice) : null,
            tags: req.body.tags ? JSON.parse(req.body.tags) : [],
            isFeatured: req.body.isFeatured === "true",
            images: imagesData
        }

        const newProduct = await Product.create(newProductData);
        return res.status(201).json({ msg: "Successfully added product", product: newProduct });
    } catch (err) {
        console.dir(err, { depth: null });

        return res.status(500).json({
            error: err,
            message: err.message,
        })
    }
}