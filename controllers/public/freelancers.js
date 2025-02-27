import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from "config"
import freelancerModel from "../../models/Freelancers/Freelancers.js"
import router from "../freelancers/freelancers.js"
import sendEmail from "../../utils/sendEmail.js"
import sendSMS from "../../utils/sendSMS.js"


const JWT_KEY = config.get("JWT_KEY");
const URL = config.get("URL");

router.post("/signup", async (req, res)=>{
    try {

        // take inp from the freelancer
        let {fullname, email, password, phone, expertiseIn, profilePhoto, portfolio, bestWork} = req.body;
          
        // duplicate check
        let freelancerExist = await freelancerModel.findOne({email});
        if(freelancerExist){
            return res.status(200).json({msg: `email already exists, pls login!🙌`})
        } 

        // hash the pass 
        let hashPass = await bcrypt.hash(password, 10);

        // generate token for email and phone
        let emailToken = Math.random().toString(36).substring(2);
        let phoneToken = Math.random().toString(36).substring(2);

        // create a new obj and save the freelancer

        let newFreelancer = {
            fullname,
            phone,
            email,
            password: hashPass,
            expertiseIn,
            portfolio,
            profilePhoto,
            freelancerVerifyToken: {
                email: emailToken,
                phone: phoneToken
            }
        }
        
        // save the freelancer
        await freelancerModel.create(newFreelancer)

        // email verification link
        let emailData = {
          subject: "Email Verification",
          to: email,
          html: `<h1>Click the link below to verify your email:</h1>\n <p>${URL}/api/public/emailverify/${emailToken}">Verify email</p>`
        }
         
        sendEmail(emailData)

         // send link to mobile for verification
         let smsData = {
            body: `dear user, please verify your phone here, ${URL}/api/public/phoneverify/${phoneToken}`,
            to: phone

        }

        sendSMS(smsData);

        console.log(`${URL}/api/public/emailverify/${emailToken}`);  
        console.log(`${URL}/api/public/phoneverify/${phoneToken}`);

        res.status(200).json({msg: `freelancer registered successfully!`})

    } catch (error) {
        console.log(error.name, error.message);
        res.status(401).json({msg: error})
    }
})

router.post("/signin", async (req, res)=>{
    try {
        // take input
        let {email ,password} = req.body
        
        // check if email exists
        let freelancer = await freelancerModel.findOne({email})
        if(!freelancer){
           return res.status(200).json({msg: `email not found! please register first!`})
        }

        // check if email is verified 
        if(!freelancer.freelancerVerified.email == true){
            return res.status(200).json({msg: `please verify your email first🙌`})
        }

        // mobile verify
        if(!freelancer.freelancerVerified.phone == true){
            return res.status(200).json({msg: `verify your mobile n try again🙌`})
        }

        // checking password
        let checkPass = await bcrypt.compare(password, freelancer.password)
        if(!checkPass){
            return res.status(200).json({msg: `invalid password`})
        }

        // generate jwt token 
        let token = jwt.sign({_id: freelancer.id}, JWT_KEY, {expiresIn: "90d"});

        res.status(200).json({msg: `logged in successfully!🙌`, token})

     } catch (error) {
        console.log(error.name, error.message);
        res.status(401).json({msg: error})
    }
})

router.get("/emailverify/:token", async (req, res)=>{
    try {
        // take token from url
        let token = req.params.token;
        const freelancer = await freelancerModel.findOne({"freelancerVerifyToken.email": token});
        if(!freelancer){
            return res.status(200).json({msg: `invalid email verification`})
        }

        if(freelancer.freelancerVerified.email == true){
            return res.status(200).json({msg: `email verified!`})
        }

        // mark email as verified
        freelancer.freelancerVerified.email = true;
        freelancer.freelancerVerifyToken.email = null;
        await freelancer.save();
        
    } catch (error) {
        console.log(error.name, error.message);
        res.status(401).json({msg: error})
        
    }
})


router.get("/phoneverify/:token", async (req, res)=>{
    try {
        // take token from url
        let token = req.params.token;
        const freelancer = await freelancerModel.findOne({"freelancerVerifyToken.phone": token});
        if(!freelancer){
            return res.status(200).json({msg: `invalid phone verification`})
        }

        if(freelancer.freelancerVerified.phone == true){
            return res.status(200).json({msg: `mobile phone verified!`})
        }

        // mark email as verified
        freelancer.freelancerVerified.phone = true;
        freelancer.freelancerVerifyToken.phone = null;
        await freelancer.save()
        
    } catch (error) {
        console.log(error.name, error.message);
        res.status(401).json({msg: error})
        
    }
});

export default router