import nodemailer from "nodemailer"
import config from "config"

const user = config.get("USER");
const pass = config.get("PASS");

async function sendEmail(emailData) {

    try {

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth:{
                user: user,
                pass: pass
            }
        });

        let sender = await transporter.sendMail({
            from: user,
            to: emailData.to,
            subject: emailData.subject,  // Add subject here
            text: emailData.text,
            html: emailData.html
        });
        
        
    } catch (error) {
        console.log(error);
    }
    
}

export default sendEmail