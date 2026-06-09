import mongoose, { model } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true , "Username required"],

    },
    email : {
        type : String,
        required : [true , "Email is required"],
        unique : true,
        validate : {
            validator :function(v){
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message : "Please enter a valid email address (e.g., name@example.com)."
        }
    },
    password : {
        type : String,
        rquired : [true , "Password is required"],
         validate : {
            validator : function(v){
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
            },
            message : "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character (e.g., @, $, !)."
        } 
    }
})

userSchema.pre("save", async function() {
   

    try {
        const salt = await  bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password , salt);
       
    }catch(err) {
        throw Error({err : err?.message});
    }
})

export default mongoose.model("User", userSchema);