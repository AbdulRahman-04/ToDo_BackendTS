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
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("config"));
const USER = config_1.default.get("EMAIL");
const PASS = config_1.default.get("PASS");
function sendEmail(emailData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let transporter = nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: USER,
                    pass: PASS
                }
            });
            let sender = yield transporter.sendMail({
                from: USER,
                to: emailData.to,
                subject: emailData.subject,
                text: emailData.text,
                html: emailData.html
            });
            console.log("email sent successfully: ", `${emailData.to}: ${sender.messageId}`);
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = sendEmail;
