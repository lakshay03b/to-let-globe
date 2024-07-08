import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://lakshaybansal43f:Lakshay25@cluster0.xfbadcs.mongodb.net/to-let_globe').then(()=>console.log("DB Connected"));
}