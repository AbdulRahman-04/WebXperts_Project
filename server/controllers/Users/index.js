import express from "express"
import userModel from "../../models/Users/Users.js"

const router = express.Router();

router.get("/getallusers",async  (req, res)=> {
    try {
       let getAll = await userModel.find({})
        res.status(200).json({msg: getAll})
        
    } catch (error) {
        res.status(401).json({msg: error})
    }
})

router.get("/getoneuser/:id", async (req, res)=>{
    try {
        let paramsId = req.params.id
        let getOne = await userModel.findOne({_id: paramsId});
        res.status(200).json({msg: getOne})
    } catch (error) {
        res.status(401).json({msg: error})
    }
})

router.put("/editoneuser/:id", async (req, res)=>{
    try {
        let paramsId = req.params.id;
        let userInp = req.body;
        await userModel.updateOne({_id: paramsId}, {$set: userInp});
        res.status(200).json({msg: `user updated Successfully!`})
        
    } catch (error) {
        res.status(401)
    }
})

router.delete("/deleteoneuser/:id", async (req, res)=>{
    try {
        let paramsId = req.params.id;
        await userModel.deleteOne({_id: paramsId})
        res.status(200).json({mgs: `user deleted successfully!✅`})
    } catch (error) {
        res.status(401).json({msg: error})
    }
})

router.delete("/deleteall", async (req, res)=>{
    try {
        await userModel.deleteMany({})
        res.status(200).json({msg: `all users deleted✅`})
    } catch (error) {
        res.status(401).json({msg: error})
    }
})

export default router;