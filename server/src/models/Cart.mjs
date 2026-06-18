import mongoose, { Schema } from "mongoose";

const cartItemsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
    size: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { _id: false });
const cartSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required : true,
        unique : true
    },
    items: {
        type: [cartItemsSchema] 
    },
    billTotal: {
        type: Number,
        required: true,
        default: 0
    }
}, {timestamps : true});

cartSchema.pre("save", function(next) {
    if(this.items && this.items.length > 0) {
        this.billTotal = this.items.reduce((acc,item) => acc + item.price * item.quantity , 0);
    }else {
        this.billTotal = 0;
    }
    next();
})

export default mongoose.model("Cart",cartSchema);