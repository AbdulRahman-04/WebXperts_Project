import twilio from "twilio"
import config from "config"

const sid = config.get("SID")
const token = config.get("TOKEN")
const phone = config.get("PHONE")

let client = new twilio(sid, token)

async function sendSMS(smsData) {
    
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

export default sendSMS