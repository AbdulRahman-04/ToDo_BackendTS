import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import config from "config";

cloudinary.config({
  cloud_name: config.get<string>("CLOUDINARY_CLOUD_NAME"),
  api_key: config.get<string>("CLOUDINARY_API_KEY"),
  api_secret: config.get<string>("CLOUDINARY_API_SECRET"),
});

export const uploadToCloudinary = async (localPath: string): Promise<string> => {
  try {
    // ✅ Upload the file to Cloudinary and get the result
    const result = await cloudinary.uploader.upload(localPath, {
      folder: "todo-images", // The file will be stored in this folder on Cloudinary
    });

    // ✅ Delete the local file after successful upload (to free up storage)
    fs.unlinkSync(localPath);

    // ✅ Return the secure URL of the uploaded image
    return result.secure_url;

  } catch (error) {
    // ❌ If the upload fails, still delete the local file to avoid leftover files
    fs.unlinkSync(localPath);
    
    // ❌ Pass the error up to handle it wherever this function is called
    throw error;
  }
};
