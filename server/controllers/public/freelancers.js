import express from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import config from "config"
import jwt from  "jsonwebtoken"
import sendEmail from "../../utils/sendEmail.js"
import sendSMS from "../../utils/sendSMS.js"
import FreelancerModel from "../../models/Freelancers/Freelancers.js"

const router = express.Router();

const URL = config.get("URL");
const KEY = config.get("KEY");

router.post("/freelancersignup", async (req, res)=>{
    try {
        // take input from freelancer
        let {fullname, email, password,phone, expertiseIn, experience, hourlyRate, portfolioURL, profilePhoto} = req.body;

        // duplicate check
        let freelancerExist = await FreelancerModel.findOne({email});
        if(freelancerExist){
            return res.status(200).json({msg: 'freelancer already exists!'})
        }
        // hash the password
        let hashPass = await bcrypt.hash(password, 10);

        // generate two random tokens for email and phone
        let emailToken = Math.random().toString(36).substring(2);
        let phoneToken = Math.random().toString(26).substring(2);

        // make a new obj and store all the user info inside it and push obj into db

        let newFreeLancer = {
            fullname,
            email,
            password: hashPass,
            phone,
            expertiseIn,
            experience,
            hourlyRate,
            portfolioURL,
            profilePhoto
        }

        await FreelancerModel.create(newFreeLancer);

        // send link for email verification

        let emailData = {
            to: email,
            subject: "email verification",
             html: "<h1> Team WebXperts</h1>\n <p> hey lancer, please verify your email by clicking on below link </p>\n ", 
            // text: `${URL}/api/public/emailverify/${emailToken}`
        }

        await sendEmail(emailData);

        // send link for mobile verification
        let smsData = {
            body: `dear lancer, please verify your email here, ${URL}/api/public/phoneverify/${phoneToken}`,
            to: phone,
        }

        sendSMS(smsData);

        console.log(`${URL}/api/public/emailverify/${emailToken}`);  
        console.log(`${URL}/api/public/phoneverify/${phoneToken}`);
        
        res.status(200).json({msg: `you'll be registered as new freelancer on our website once your verify your email and mobile via link provided on your email and phone number!🙌`})
        
    } catch (error) {
        console.log(error);
        res.status(401).json({msg: error})
    }
});

router.get("/emailverify/:token", async (req, res)=>{
    try {
        // take token from url
        let token = req.params.token

        // check if url token === userVerifyToken.email
        let freeLancer = await FreelancerModel.findOne({"freelancerVerifyToken.email": token})
        if(!freeLancer){
            return res.status(200).json({msg: `invalid token`})
        }

        // check if user hasn't clicked the link more than once
        if(freeLancer.freelancerVerified.email==true){
            return res.status(200).json({msg: `email verified`})
        }

        // change the freelancerVerfied email to true and userVerify token email to null
        freeLancer.freelancerVerified.email = true;
        freeLancer.freelancerVerifyToken.email = null;

        // save the changes
        await freeLancer.save()
        console.log("email sent successfuly!✔")

        res.status(200).json({msg: `freelancer email verified✅`})
    } catch (error) {
        console.log(error);
        res.status(401).json({msg: error})
        
    }
})


router.get("/phoneverify/:token", async (req, res)=>{
    try {
        // take token from url
        let token = req.params.token

        // check if url token === userVerifyToken.phone
        let freelancer = await FreelancerModel.findOne({"freelancerVerifyToken.phone": token})
        if(!freelancer){
            return res.status(200).json({msg: `invalid token❌`})
        }

        // check if user hasn't clicked the link more than once
        if(freelancer.freeLancerVerified.phone == true){
          return res.status(200).json({msg: `user phone number already verified!🙌`})  
        }

        // change the userVerified phone to true and userVerify token phone to null
        freelancer.freeLancerVerified.phone = true;
        freelancer.freelancerVerifyToken.phone = null;

        // save the changes
        await freelancer.save();

        res.status(200).json({msg: `phone verified✅`})
    } catch (error) {
        console.log(error);
        res.status(200).json({msg: error})
    }
});

//login API
router.post("/freelancersignin", async (req, res)=>{
    try {
        // take input from user
        let {email, password}= req.body;

        // check if email exists in db
        let checkfreelancer = await freeLancerModel.findOne({email});
        if(!checkfreelancer){
            return res.status(200).json({msg: `invalid email!❌`});
        }

        // check password
        let checkPass = await bcrypt.compare(password, checkUser.password)
        if(!checkPass){
            return res.status(200).json({msg: `invalid password❌`})
        }

        //  generate jwt token
        let token = jwt.sign({checkfreelancer}, KEY, {expiresIn: "1d"});

        res.status(200).json({msg: `freelancer loggedin successfully!`, token})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
});

export default router;