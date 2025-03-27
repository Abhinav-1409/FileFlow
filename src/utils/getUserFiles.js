"use server";
import connectDB from "@/services/connection";
import FileUrls from "@/models/files";
import shortUrls from "@/models/shortUrls";

export default async function getUserFiles(userId) {
    await connectDB();
    try {
        const files = await FileUrls.find({ user: userId }).lean();

        const urls = await Promise.all(
            files.map(async (file) => {
                const shortUrl = await shortUrls.findOne({ _id: file.url }).lean();
                return {
                    title: file.title,
                    url: shortUrl?.shortUrl || null,
                };
            })
        );

        console.log(urls);
        return urls;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
