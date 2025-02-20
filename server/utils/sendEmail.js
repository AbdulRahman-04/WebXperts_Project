import nodemailer from "nodemailer"
import config from "config"

const USER = config.get("APP");
const PASS = config.get("PASS");


async function sendEmail(emailData) {

    try {

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 5043,
            secure: true,
            auth: {
              user: USER,
              pass: PASS
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