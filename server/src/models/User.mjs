import mongoose, { model } from "mongoose";
import bcrypt from "bcrypt";

const imageSchema = new mongoose.Schema({
    public_id: {
        type: String,
        default: null
    },
    url: {
        type: String,
        default: null
    }
}, { _id: false });
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username required"],

    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: "Please enter a valid email address (e.g., name@example.com)."
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: function (v) {
                if (!this.isModified("password")) return true;
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
            },
            message: "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (e.g., @, $, !)."
        }
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    profileImg: {
        type: imageSchema
    },
    phone: {
        type: String,
        default: null
    }
})
userSchema.pre("save", async function() {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model("User", userSchema);