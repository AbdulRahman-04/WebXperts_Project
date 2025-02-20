import nodemailer from "nodemailer"
import config from "config"

const user = config.get("APP");
const pass = config.get("PASS");

async function sendEmail(emailData) {

    try {

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 5043,
            secure: true,
            auth:{
                user: user,
                pass: pass
            }
        });

        let sender = transporter.sendMail({
            from: emailData.from,
            to: emailData.to,
            text: emailData.text,
            html: emailData.html
        })
        
    } catch (error) {
        console.log(error);
    }
    
}

export default sendEmail