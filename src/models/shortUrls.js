import mongoose, { Schema } from "mongoose";
import { unique } from "next/dist/build/utils";

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