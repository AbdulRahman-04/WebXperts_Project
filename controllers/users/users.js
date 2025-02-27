import express from "express"
import userModel from "../../models/Users/Users.js";
import freelancerModel from "../../models/Freelancers/Freelancers.js";

const router = express.Router();

router.get("/getallusers", async(req, res)=>{
    try {

        let getAll = await userModel.find({});
        res.status(200).json({msg: getAll})
        
    } catch (error) {
        console.log(error.name, error.message);
        res.status(401).json({msg: error})
    }
});

router.get("/getoneuser/:id", async (req, res)=>{
    try {

        let paramsId = req.params.id;
        let getOne = await userModel.findOne({_id: paramsId})
        res.status(200).json({msg: getOne})
    } catch (error) {
        console.log(error.name, error.message);
        res.status(401).json({msg: error})
    }
});



router.put("/edituserprofile/:id", async (req, res)=>{
    try {
        let userInp = req.body
        let paramsId = req.params.id;
        await userModel.updateOne({_id: paramsId}, {$set: userInp})
        res.status(200).json({msg: `your profile has been updated💪`})
    } catch (error) {
        console.log(error.name);
        console.log(error.message);
        res.status(401).json({msg: error})
    }
});

router.delete("/deleteuserprofile/:id", async (req, res)=>{
    try {
        let paramsId = req.params.id;
        await userModel.deleteOne({_id: paramsId});
        res.status(200).json({msg: `your profile has been deleted user🥲`})
        
    } catch (error) {
        console.log(error.name, error.message);
        res.status(401).json({msg: error})
    }
})

export default router