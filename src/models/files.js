import mongoose, { Schema } from "mongoose";
import Users from "./user"; // Ensure this path is correct
// console.log("Users model:", Users); // Debugging log

const fileSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users", // Matches the model name in user.js
        default: null,
    },
    title: {
        type: String,
        required: true,
    },
    url: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "shortUrls",
        required: true,
    },
});

const FileUrls = mongoose.models.fileUrls || mongoose.model("fileUrls", fileSchema);
export default FileUrls;