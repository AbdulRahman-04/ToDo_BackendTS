import mongoose, { Schema, Model, Document } from "mongoose";

// ✅ TypeScript Interface (corrected)
interface IUser extends Document {
  userName: string;
  password: string;
  email: string;
  age: number;
  userVerified: {
    email: boolean | null;
    phone: boolean | null;
  };
  userVerifyToken: {
    email?: string | null;
    phone?: string | null;
  };
}

// ✅ Mongoose Schema (corrected)
const userSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: true, // ✅ Fix: require ❌ → required ✅
      maxlength: 70, // ✅ Fix: maclength ❌ → maxlength ✅
      minlength: 10,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true, // ✅ Fix: missing required
      minlength: 8,
    },
    age: {
      type: Number,
      required: true,
    },
    userVerified: {
      email: {
        type: Boolean, // ✅ Fix: boolean | null ❌ → Boolean ✅
        default: false,
      },
      phone: {
        type: Boolean,
        default: false,
      },
    },
    userVerifyToken: {
      email: {
        type: String,
        default: null, // ✅ Fix: type: string | null ❌ → default: null ✅
      },
      phone: {
        type: String,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

const userModel: Model<IUser> = mongoose.model<IUser>("users", userSchema, "users");

export default userModel;
