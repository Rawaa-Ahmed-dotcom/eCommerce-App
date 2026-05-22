import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo Connected");
    }catch(err ) {
        throw new Error(err.message);
    }
}