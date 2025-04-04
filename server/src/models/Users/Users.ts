import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for strict schema conformance
interface IUser extends Document {
    userName: string;
    email: string;
    password: string;
    age: number;
    userVerified: {
        email: boolean | null;
        phone: boolean | null;
    };
    userVerifyToken: {
        email?: string | null;  // Token should be string or null
        phone?: string | null;
    };
}

const userSchema = new Schema<IUser>({
    userName: {
        type: String,
        required: true,
        maxlength: 70,
        minlength: 10
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    userVerified: {
        email: {
            type: Boolean,
            default: false
        },
        phone: {
            type: Boolean,
            default: false
        }
    },
    userVerifyToken: {
        email: {
            type: String,  // Changed to String
            default: null
        },
        phone: {
            type: String,  // Changed to String
            default: null
        }
    },

}, {
    timestamps: true
});

const userModel: Model<IUser> = mongoose.model<IUser>("users", userSchema, "users");

export { userModel, IUser };
