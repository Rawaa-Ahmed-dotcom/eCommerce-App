import mongoose, { Schema } from "mongoose";
import { stringify } from "qs";
import { getNextSequence } from "../utils/getNextSequence.mjs";


const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    size: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image :{ 
        type : String,
        default : null
    },
    title : {
        type : String
    }
}, { _id: false, timestamps: false });

const orderSchema = new mongoose.Schema({
    orderNumber : {
        type : Number,
        unique : true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    contactInfo : {
        fullname : {
            type : String, 
            required : true
        },
        email : {
            type : String, 
            required : true
        },
        phone : {
            type : String,
            required : true
        }
    },
    orderItems: {
        type: [orderItemSchema]
    },
    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode : {type : String , required : true}
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['ccd', 'card']
    },
    shippingPrice: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    totalPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    
    status: {
        type: String,
        required: true,
        enum: ['Pending',  'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    paymentDetails : {
        paidAt: { type: Date },
        transactionId: {type : String}
    },
    deliveredAt: { type: Date }
}, { timestamps: true });


orderSchema.pre("save", async function () {
    if (this.orderItems && this.orderItems.length > 0) {
        const itemsPrice = this.orderItems.reduce((acc, item) => item.price * item.quantity + acc, 0);
        this.totalPrice = itemsPrice + this.shippingPrice + this.taxPrice;
    }
    if(this.isNew && !this.orderNumber) {
        this.orderNumber = await getNextSequence();

    }
})


export default mongoose.model("Order" , orderSchema);