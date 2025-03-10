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
    url: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shortUrls',
    },
});

const FileUrls = mongoose.model("fileUrls", fileSchema);
export default FileUrls;