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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const sendEmail_1 = __importDefault(require("../../utils/sendEmail"));
// import sendSMS from "../../utils/sendSMS"
const config_1 = __importDefault(require("config"));
const Users_1 = require("../../models/Users/Users");
const router = express_1.default.Router();
const URL = config_1.default.get("URL");
const USER = config_1.default.get("EMAIL");
const KEY = config_1.default.get("JWT_KEY");
router.post("/usersignup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, password, age } = req.body;
        // check if all fields are filled or not
        if (!userName || !email || !password || !age) {
            res.status(400).json({ msg: "fill all the fields " });
            return;
        }
        // duplicate check
        let userExist = yield Users_1.userModel.findOne({ email });
        if (userExist) {
            res.status(200).json({ msg: "user already exists, please sign in" });
            return;
        }
        // password hash
        const hashPass = yield bcrypt_1.default.hash(password, 10);
        // random token for email and phone verify
        let emailToken = Math.random().toString(36).substring(2);
        // let phoneToken = Math.random().toString(36).substring(2)
        // create new obj 
        let newUser = {
            userName,
            email,
            password: hashPass,
            age,
            userVerifyToken: {
                email: emailToken,
                // phone: phoneToken
            }
        };
        // save user in db
        yield Users_1.userModel.create(newUser);
        // email verification link
        const emailData = {
            from: USER,
            to: email,
            subject: "Verification Link",
            text: `${URL}/api/public/emailverify/${emailToken}`
        };
        (0, sendEmail_1.default)(emailData);
        // 8. Verification ke liye SMS data banate hain aur sendSMS function call karte hain.
        // const smsData = {
        //     body: `📲 Team Todo: Dear user, verify your phone by clicking the link: ${URL}/api/public/phoneverify/${phoneToken}. 
        //     If you didn't request this, ignore the message.`,
        //     to: phone
        // };
        // sendSMS(smsData);
        console.log(`${URL}/api/public/emailverify/${emailToken}`);
        // console.log(`${URL}/api/public/phoneverify/${phoneToken}`);
        res.status(200).json({ msg: "You'll be registered as our new user, once u verify your email🙌" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
}));
router.get("/emailverify/:token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // take token from url
        let token = req.params.token;
        // Compare URL token with userVerifyToken.email token
        const user = yield Users_1.userModel.findOne({ "userVerifyToken.email": token });
        if (!user) {
            res.status(404).json({ msg: "Invalid token ❌" });
            return;
        }
        // If user already verified the link
        if (user.userVerified.email) {
            res.status(200).json({ msg: "User email already verified" });
            return;
        }
        // userVerify token null and userVerified true
        if (user) { // ✅ Safe check before modifying user
            user.userVerified.email = true;
            user.userVerifyToken.email = null;
            yield user.save(); // ✅ Save the updated user
        }
        res.status(200).json({ msg: "User email verified successfully! ✅" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
}));
// router.get("/api/phoneverify/:token", async (req: Request, res: Response): Promise<void>=>{
//     try {
//         // take token from url
//         let token = req.params.token;
//         // compare token with emailToken
//         const user = await userModel.findOne({"userVerifyToken.phone": token})
//         if(!user){
//             res.status(200).json({msg: "Invalid Token"})
//             return;
//         }
//         //  check if user hasn't clicked link more than once
//         if(user.userVerified.phone === true){
//             res.status(200).json({msg: "User Phone Number Already Verified🙌"})
//             return
//         }
//         // change in db
//         user.userVerified.phone = true;
//         user.userVerifyToken.phone = null
//         // response 
//         res.status(200).json({msg: "user phone verified successfully!🙌"})
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({msg: error})
//     }
// })
// login route
router.post("/usersignin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // take input from user
        let { email, password } = req.body;
        // check if email exists in db
        let checkUser = yield Users_1.userModel.findOne({ email });
        if (!checkUser) {
            res.status(200).json({ msg: "email doesn't exists" });
            return;
        }
        // compare password
        let pass = yield bcrypt_1.default.compare(password, checkUser.password);
        if (!pass) {
            res.status(200).json({ msg: "invalid password" });
            return;
        }
        // generate jwt token 
        let token = jsonwebtoken_1.default.sign({ id: checkUser._id }, KEY, { expiresIn: "30d" });
        res.status(200).json({ msg: "User Logged in Successfully!🙌", token });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
}));
router.post("/forgotpassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // take email from user
        let { email } = req.body;
        // check if exists in db
        let checkUser = yield Users_1.userModel.findOne({ email });
        if (!checkUser) {
            res.status(400).json({ msg: "email not found" });
            return;
        }
        // generate new password
        let newPass = Math.random().toString(36).substring(2);
        console.log(newPass);
        //   send pass on email
        const emailData = {
            from: USER,
            subject: "New Password",
            to: email,
            html: `<p>Your new password is: <strong>${newPass}</strong></p>`
        };
        (0, sendEmail_1.default)(emailData);
        //   hashs the new pass 
        let hashPass = yield bcrypt_1.default.hash(newPass, 10);
        checkUser.password = hashPass;
        yield checkUser.save();
        res.status(200).json({ msg: "New Password sent to ur email successfully!" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
}));
exports.default = router;
