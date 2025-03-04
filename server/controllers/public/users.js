import express, { text } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import jwt from "jsonwebtoken";
import sendEmail from "../../utils/sendEmail.js";
import sendSMS from "../../utils/sendSMS.js";
import userModel from "../../models/Users/Users.js";

const router = express.Router();

const URL = config.get("URL");
const KEY = config.get("KEY");

router.post("/usersignup", async (req, res) => {
  try {
    // input taking from user
    let { username, email, password, phone, serviceLookingFor } = req.body;

    // duplicate check in db
    let userExists = await userModel.findOne({ email });
    if (userExists) {
      return res.status(200).json({ msg: `the email already exists🙌` });
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
      userVerifyToken: {
        email: emailToken,
        phone: phoneToken,
      },
    };

    await userModel.create(newUser);

    // verification links on email and phone

    let emailData = {
      from: "Team WebXperts",
      to: email,
      subject: "Email Verification",
      html: `<a href="${URL}/api/public/emailverify/${emailToken}">Verify Email</a>
            <br>
            <p>If the link doesn't work, copy and paste this URL:</p>
            <p>${URL}/api/public/emailverify/${emailToken}</p>`,
    };

    sendEmail(emailData);

    // send link to mobile for verification

    let smsData = {
      body: `Dear User, please verify your phone here: ${URL}/api/public/phoneverify/${phoneToken},`,
      to: phone,
    };

    sendSMS(smsData);

    console.log(`${URL}/api/public/emailverify/${emailToken}`);
    return res
      .status(201)
      .json({
        msg: "Signup successful! Please check your email & phone for verification.",
      });
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: error });
  }
});

router.get("/emailverify/:token", async (req, res) => {
  try {
    // take token from url
    let token = req.params.token;

    // check if url token === userVerifyToken.email
    let user = await userModel.findOne({ userVerifyToken: token });
    if (!user) {
      return res.status(200).json({ msg: "invalid token" });
    }

    //    check if user hasn't clicked the link more than once
    if (user.userVerified.email == true) {
      return res.status(200).json({ msg: "email already verified!" });
    }

    // change the userVerified email to truw and userVerify token email to null
    user.userVerified.email = true;
    user.userVerifyToken.email = null;

    // save the changes
    await user.save();

    res.status(200).json({ msg: `email verified✅` });
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: error });
  }
});

router.get("/phoneverify/:token", async (req, res) => {
  try {
    // take token from url
    let token = req.params.token;

    // check if token === userVerifytoken.phone
    let user = await userModel.findOne({ "userVerifyToken.phone": token });

    if (!user) {
      res.status(200).json({ msg: `invalid token` });
    }

    // check if user hasn't clicked the link more than once
    if (user.userVerified.phone === true) {
      res.status(200).json({ msg: `phn no already verified✅` });
    }
    // change the userVerifiedphone to true and userVerifyToken.phone to false
    user.userVerified.phone = true;
    user.userVerifyToken.phone = true;

    //  save the changes
    await user.save();

    res.status(200).json({ msg: `phone number verified✅` });
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: error });
  }
});

router.post("/usersignin", async (req, res) => {
  try {
    // take input from user
    let { email, password } = req.body;

    // check if email exists in db
    let checkUser = await userModel.findOne({ email });
    if (!checkUser) {
      return res.status(200).json({ msg: `invalid email` });
    }
    // check the password
    let checkPass = await bcrypt.compare(password, checkUser.password);
    if (!checkPass) {
      return res.status(200).json({ msg: `invalid password` });
    }
    // generate jwt token for authorization
    let token = jwt.sign({ checkUser }, KEY, { expiresIn: "90d" });

    res.status(200).json({ msg: `user loggedin successfully`, token });
  } catch (error) {
    console.log(error);
    res.status(200).json({ msg: error });
  }
});

export default router;
