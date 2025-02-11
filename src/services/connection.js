import mongoose from "mongoose";

const uri = "mongodb+srv://PostHive:PostHiveDev@data.5veo4.mongodb.net/FileFlow?retryWrites=true&w=majority&appName=data";
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