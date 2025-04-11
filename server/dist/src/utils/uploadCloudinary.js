"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToCloudinary = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("config")); // 👈 important line
cloudinary_1.default.v2.config({
    cloud_name: config_1.default.get("CLOUDINARY_CLOUD_NAME"),
    api_key: config_1.default.get("CLOUDINARY_API_KEY"),
    api_secret: config_1.default.get("CLOUDINARY_API_SECRET"),
});
const uploadToCloudinary = (localPath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cloudinary_1.default.v2.uploader.upload(localPath, {
            folder: "todo-images",
        });
        // 🧹 Delete local file after uploading
        fs_1.default.unlinkSync(localPath);
        return result.secure_url;
    }
    catch (err) {
        fs_1.default.unlinkSync(localPath); // delete if upload failed
        throw err;
    }
});
exports.uploadToCloudinary = uploadToCloudinary;
