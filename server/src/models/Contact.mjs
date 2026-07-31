import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Name is required"]
    },
    email : {
        type : String,
        required : [true, "Email is required"],
        validate : {
            validator : (v) => {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message : "Please enter a valid email address (e.g., name@example.com)."
        }
    },
    message : {
        type : String,
        required : [true,"Message is required"]
        
    }
});

export default mongoose.model("Contact" , contactSchema);