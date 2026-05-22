import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: [true, " Url is required"]
    },
    public_id: {
        type: String,
        required: [true, "Public ID must be string"]
    }
}
    , { timestamps: true });

const categoriesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Category Title is required"],
        trim: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: [true, "Category description is required"],
        max: 200
    },
    slug: {
        type: String
    },
    img: {
        type: imageSchema,
        required: [true, "Category img is required"],

    }
}, { timestamps: true });

export default mongoose.model('Category', categoriesSchema);