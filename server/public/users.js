import express, { text } from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import config from "config"
import jwt from "jsonwebtoken"
import sendEmail from "../utils/sendEmail.js"
import sendSMS from "../utils/sendSMS.js"
import userModel from "../models/Users/Users.js"

const router = express.Router()

const URL = config.get("URL");


router.post("/signup", async (req, res)=>{
    try {

        // input taking from user
        let {username, email, password, phone, serviceLookingFor} = req.body

        // duplicate check in db
        let userExists = await userModel.findOne({email});
        if(userExists){
            return res.status(200).json({msg: `the email already exists🙌`})
        }

        // hash password:
        let hashPass = await bcrypt.hash(password, 10);

        // generating two random tokens for email and phone verification
        let emailToken = Math.random().toString(36).substring(2);
        let phoneToken = Math.random().toString(36).substring(2);


        // make a new obj and store all the userinfo inside it and push obj in the db
        let newUser = {
            username,
            email,
            password: hashPass,
            phone,
            serviceLookingFor,
            userVerifyToken : {
                email: emailToken,
                phone: phoneToken
            }
        }

        await userModel.create(newUser)


        // verification links on email and phone

        let emailData= {
          from: "Team WebXperts",
          to: email,
          subject: "Email Verification",
          html: "<h1>Dear User,</h2> \n <p>Please verify your email using the below link</p>",
          text: `${URL}/api/public/emailverify/${emailToken}`
        }

        sendEmail(emailData);

        // send link to mobile for verification

        let smsData = {
            body: `dear user, please verify your number here: ${URL}/api/public/phoneverify/${phoneToken}`,
            to: phone
        }

        console.log(`${URL}/api/public/emailverify/${emailToken}`);
        
    } catch (error) {
        console.log(error);
        
    }
})