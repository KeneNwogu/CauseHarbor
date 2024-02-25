import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export const uploadImage = async (fileBuffer: Buffer): Promise<UploadApiResponse> => {
    const readableStream = Readable.from(fileBuffer);
    return new Promise((resolve, reject) => {
        let cld_upload_stream = cloudinary.uploader.upload_stream(
            { folder: "cause-harbour" },
            (error: any, result: UploadApiResponse) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );
        readableStream.pipe(cld_upload_stream);
    });
}