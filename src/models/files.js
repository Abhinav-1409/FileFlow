import mongoose, { Schema } from "mongoose";
import Users from "./user";

const fileSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Users,
        default: null,
    },
    title: {
        type: String,
        required: true,
    },
    originalUrl: {
        type: String,
        required: true,      
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
    }
});

const FileUrls = mongoose.model("fileUrls", fileSchema);
export default FileUrls;