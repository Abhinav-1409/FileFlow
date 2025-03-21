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

// const shortUrl = mongoose.model("shortUrls", urlSchema);
const shortUrl = mongoose.models.shortUrls || mongoose.model("shortUrls", urlSchema);
export default shortUrl;