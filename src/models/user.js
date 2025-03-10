import mongoose, { Schema } from "mongoose";
import {createHash, randomBytes} from "crypto";
import tokenUtils from "../utils/token";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) return next();
    const salt = randomBytes(10);
    const hash = createHash("sha256", salt);
    const hashedPassword = hash.update(this.password).digest("hex");

    this.salt = salt;
    this.password = hashedPassword;
    next();
});

userSchema.static("validateUserLogin", async function (email, password){
    const user = await this.findOne({email: email});
    if(!user){
        throw new Error("User not found!");
    }
    const hash = createHash("sha256",user.salt);
    const hashedPassword = hash.update(password).digest("hex");
    if( hashedPassword !== user.password){
        throw new Error("Incorrect Password");
    }
    const token = tokenUtils.createToken(user);
    return token;
});

const Users = mongoose.models.User || mongoose.model("User", userSchema);
export default Users;