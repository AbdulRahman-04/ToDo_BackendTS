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
const twilio_1 = __importDefault(require("twilio"));
const config_1 = __importDefault(require("config"));
const sid = config_1.default.get("SID");
const token = config_1.default.get("TOKEN");
const phone = config_1.default.get("PHONE");
const client = new twilio_1.default.Twilio(sid, token); // ✅ Corrected
function sendSMS(smsData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.messages.create({
                body: smsData.body,
                to: smsData.to,
                from: phone
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = sendSMS;
