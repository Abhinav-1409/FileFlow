import mongoose from "mongoose";

const uri = process.env.MONGO_URI;
async function connectDB(){
    await mongoose
    .connect(uri)
    .then(() => {
        console.log("DataBase Connected");
    })
    .catch((err) => {
        console.log("Error");
    });
};

export default connectDB;