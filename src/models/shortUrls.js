import mongoose, { Schema } from "mongoose";

const urlSchema = new Schema({
    originalUrl:{
        type: String,
        required: true,
    },
    shortUrl:{
        type: String,
        required: true,
        unique: true,
    },
});

const shortUrl = mongoose.model("shortUrls", urlSchema);
export default shortUrl;