import twilio from "twilio"
import config from "config"

const sid: string = config.get<string>("SID")
const token: string = config.get<string>("TOKEN")
const phone: string = config.get<string>("PHONE")

const client = twilio(sid, token)

interface smsDataInterface{
    body: string,
    to: string
}

async function sendSMS(smsData: smsDataInterface) {
    try {

        await client.messages.create({
            body: smsData.body,
            to: smsData.to,
            from: phone
        })
        
    } catch (error) {
        console.log(error);
        
    }
    
}

export default sendSMS;