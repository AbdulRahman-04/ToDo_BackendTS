import cloudinary from "cloudinary";
import fs from "fs";
import config from "config"; // 👈 important line

cloudinary.v2.config({
  cloud_name: config.get("CLOUDINARY_CLOUD_NAME"),
  api_key: config.get("CLOUDINARY_API_KEY"),
  api_secret: config.get("CLOUDINARY_API_SECRET"),
});

export const uploadToCloudinary = async (localPath: string) => {
  try {
    const result = await cloudinary.v2.uploader.upload(localPath, {
      folder: "todo-images",
    });

    // 🧹 Delete local file after uploading
    fs.unlinkSync(localPath);

    return result.secure_url;
  } catch (err) {
    fs.unlinkSync(localPath); // delete if upload failed
    throw err;
  }
};
