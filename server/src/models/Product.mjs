import mongoose, { Schema } from "mongoose";

const colorSchema = new mongoose.Schema({
    name: { type: String, required: true, lower: true, trim: true },
    hex: { type: String }
})
const imageSchema = new mongoose.Schema({
    url: { type: String, required: [true, "Image url is required"] },
    public_id: { type: String, required: [true, "Public ID is required"] },
    alt: { type: String, required: [true, "Alt is required"] },
    color: { type: String, required: [true, "Color is required"], lower: true, trim: true },
    isPrimary: { type: Boolean, default: false }
});
const variantSchema = new mongoose.Schema({
    size: { type: String, required: true, enum: ["S", "M", "L", "XL", "2XL", "3XL"] },
    color: { type: colorSchema },
    sku: { type: String },
    stock: { type: Number, required: true, min: 0, default: 0 }
})
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Product title is required'],
        unique: true,
        trim: true
    },
    slug: {
        type: String,
        lower: true,
        unique: true,
        trim: true
    },
    sku: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    shortDescription: {
        type: String,
        required: [true, "Short description is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category"
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    salePrice: {
        type: Number,
        default: null,
        validate: {
            validator: function (val) {
                const originalprice = this.price || (this.getUpdate && this.getUpdate().$set?.price);
                return val === null || !originalprice || val < originalprice;
            },
            message: "Sale price must be less than original price"
        }
    },
    currency: {
        type: String,
        enum: ["EGP", "USD", "EUR", "SAR"],
        default: "EGP"
    },
    gender: {
        type: String,
        enum: ["men", "women", "unisex", "kids"]
    },

    material: {
        type: String
    },
    care_instructions: {
        type: String
    },
    fit_type: {
        type: String
    },
    brand: {
        type: String
    },
    variants: {
        type: [variantSchema]
    },
    images: {
        type: [imageSchema],
    },
    ratings: {
        average: { type: Number, min: 0, max: 5, default: 0 },
        count: { type: Number, min: 0, default: 0 }
    },
    tags: {
        type: [String],
        default: []
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["active", "draft", "archived"],
        default: "draft"
    }
}, { timestamps: true });


productSchema.virtual("dicountPercentage").get(function () {
    if (!this.salePrice) return 0;
    return Math.round(((this.price - this.salePrice) / this.price) * 100);
})

productSchema.virtual("availableColors").get(function () {
    if (!this.variants) return [];
    return [...new Set(this.variants.filter(v => v.stock > 0).map(v => v.color))];
});

productSchema.virtual("availableSizes").get(function () {
    if (!this.variants) return [];
    return [...new Set(this.variants.filter(v => v.stock > 0).map(v => v.size))];
});

productSchema.pre("save", function (next) {
    const product = this;

    const allColorsInVariants = [
        ...new Set(product.variants.map(v => v.color))
    ];

    const colorsWithImages = [
        ...new Set(product.images.map(img => img.color))
    ];

    for (const color of allColorsInVariants) {
        if (!colorsWithImages.includes(color.name)) {
            return next(new Error(`Please upload at least one image for color: (${color.name})`));
        }
    }

    next();
});


export default mongoose.model("Product", productSchema);