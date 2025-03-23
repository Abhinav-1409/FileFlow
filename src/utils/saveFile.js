"use server"
import FileUrls from "@/models/files";
import shortUrls from "@/models/shortUrls";
import connectDB from "@/services/connection";

export default async function saveFile(userId, title, url) {
    await connectDB();
    const urlId = await shortUrls.findOne({ shortUrl: url });
    try {
        await FileUrls.create({ user: userId, title: title, url: urlId._id });
        console.log("File saved successfully!");
    } catch (err) {
        console.error(err);
    }
}