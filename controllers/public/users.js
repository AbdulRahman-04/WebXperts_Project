import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../../models/Users/Users.js"
import config from "config"
import sendEmail from "../../utils/sendEmail.js"
import sendSMS from "../../utils/sendSMS.js"

const URL = config.get("URL");
const JWT_KEY = config.get("JWT_KEY");

const router = express.Router();

router.post("/usersignup", async (req, res)=>{
    try {
        // take input from user
        let {fullname, email, password, phone, serviceLookingFor} = req.body;

        // duplicate check 
        let userExist = await userModel.findOne({email})
        if(userExist){
            return res.status(401).json({msg: `user already exists! please login✅`})
        }

        // hash the pass 
        let hashPass = await bcrypt.hash(password, 10);

        // generate two random tokens
        let emailToken = Math.random().toString(36).substring(2);
        let phoneToken = Math.random().toString(36).substring(2);

        // create new obj and store the info of user
        let newUser = {
            fullname,
            email,
            password: hashPass,
            phone,
            serviceLookingFor,
            userVerifyToken: {
                email: emailToken,
                phone: phoneToken
            }
        }

        await userModel.create(newUser)

        // verify link to email
        let emailData = {
            to: email,
            subject: "Email Verification",
             html: `<h1>Click the link below to verify your email:</h1>\n <p>${URL}/api/public/users/emailverify/${emailToken}">Verify email</p>`
        }

        sendEmail(emailData);

        // verify link to phone
        let smsData = {
            to: phone,
            body: `dear user, please verify your phone here, ${URL}/api/public/users/phoneverify/${phoneToken}`
        }
        sendSMS(smsData)

        // print the links in console
        console.log(`${URL}/api/public/users/phoneverify/${phoneToken}`);
        console.log(`${URL}/api/public/users/emailverify/${emailToken}`);
        
        res.status(200).json({msg: `Congrats🙌, your details verified successfully! please verify your email and phone number.`})
        
        
    } catch (error) {
        res.status(401).json({msg: error})
    }
})

router.post("/usersignin", async (req, res)=>{
    try {
        // take input from user
        let {email, password} = req.body;

        // check email
        let checkUser = await userModel.findOne({email});
        if(!checkUser){
            return res.status(401).json({msg: `email not exists!✅`})
        }

         // check if email is verified 
         if(!user.userVerified.email == true){
            return res.status(200).json({msg: `please verify your email first🙌`})
        }

        // mobile verify
        if(!user.userVerified.phone == true){
            return res.status(200).json({msg: `verify your mobile n try again🙌`})
        }

        // check pass 
        let checkPass = await bcrypt.compare(password, checkUser.password);
        if(!checkPass){
            return res.status(401).json({msg: `invalid password⚠️`})
        }

        // generate jwt token
        let token = jwt.sign({_id: checkUser.id}, JWT_KEY, {expiresIn: "90d"});
 
        res.status(200).json({msg: `user logged in successfully!🙌`, token})


    } catch (error) {
        res.status(401).json({msg: error})
    }
})

router.get("/emailverify/:token", async (req, res)=>{
    try {
        console.log("Email API Incoming");
        // take token from url
        let token = req.params.token

        // compare the token
        let user = await userModel.findOne({"userVerifyToken.email": token})
        console.log(user);

        if(!user){
            return res.status(400).json({msg: `invalid token`})
        }

        // check if user hasn't clicked the verification link more than once
        if(user.userVerified.email == true){
            return res.status(402).json({msg: `user email already verified⚠️`})
        }

         // change the userVerified email to true and userVerify token email to null
         user.userVerified.email = true;
         user.userVerifyToken.email = null;
 
         // save the changes
         await user.save();
        res.status(200).json({msg: `email verified✅`})


    } catch (error) {
        console.log(error);
        res.status(401).json({msg: error})
    }

})


router.get("/phoneverify/:token", async (req, res)=>{
    try {
        // take token from url
        let token = req.params.token
        console.log(token);
        

        // check if url token === userVerifyToken.phone
        let user = await userModel.findOne({"userVerifyToken.phone": token});
        console.log(user);

        if(!user){
            return res.status(200).json({msg: `invalid token❌`})
        }

        // check if user hasn't clicked the link more than once
        if(user.userVerified.phone == true){
          return res.status(200).json({msg: `user phone number already verified!🙌`})  
        }

        // change the userVerified phone to true and userVerify token phone to null
        user.userVerified.phone = true;
        user.userVerifyToken.phone = null;

        // save the changes
        await user.save();

        res.status(200).json({msg: `phone verified✅`})
    } catch (error) {
        console.log(error);
        res.status(200).json({msg: error})
    }
});

router.post("/resetpassword", async(req, res)=>{
    try {
      // take email from user 
      let {email} = req.body;
      if(!email){
        return res.status(400).json({msg: `please provide an email`})
      }
      // check if email exists in DataBase
      let checkEmail = await userModel.findOne({email})
      if(!checkEmail){
        return res.status(401).json({msg: `no email found❌`})
      }
  
      // generate a new random password for user
      let newPass = Math.random().toString(36).substring(2);
      console.log(newPass);
  
      // hash the generated password 
      let hashPass = await bcrypt.hash(newPass, 10);
      console.log(hashPass);
      user.password = hashPass;
  
      // save the user
      await user.save();
  
      let emailData = {
        to: email,
        subject: "New Password",
        html: `<p> your new password is <strong>${newPass}</strong></p>`
      }
      sendEmail(emailData)
  
       res.status(200).json({msg: `new password sent successfully to your email!🙌`})
      
    } catch (error) {
      res.status(401).json({msg: error})
    }
  })
  

export default router