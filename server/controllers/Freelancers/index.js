import express from "express"
import userModel from "../../models/Users/Users";
import FreelancerModel from "../../models/Freelancers/Freelancers";

const router = express.Router();

router.get("/getallfreelancers", async (req, res)=> {
    try {
        let getAll = await FreelancerModel.find({})
        res.status(200).json({msg: getAll})
        
    } catch (error) {
        res.status(401).json({msg: error})
    }
})

router.get("/getonefreelancer/:id", async (req, res)=>{
    try {
        let paramsId = req.params.id;
        let getOne = await FreelancerModel.find({_id: paramsId})
        res.status(200).json({msg: getOne})
    } catch (error) {
        res.status(401).json({msg: error})
    }
})

router.put("/editonefreelancer", async (req, res)=>{
    try {
        let paramsId = req.params.id;
        let userInp = req.body;
        await FreelancerModel.updateOne({_id: paramsId}, {$set: userInp})
        res.status(200).json({msg: `freelancer is edited⚡`})
        
    } catch (error) {
        res.status(401)
    }
})

router.delete("/deleteonefreelancer/:id", async (req, res)=>{
    try {
        let paramsId = req.params.id;
        await FreelancerModel.deleteOne({_id: paramsId})
        res.status(200).json({mgs: `one freelancer is deleted`})
    } catch (error) {
        res.status(401).json({msg: error})
    }
})

router.delete("/deleteall", async (req, res)=>{
    try {
        await FreelancerModel.deleteMany({})
        res.status(200).json({msg: `all freelancers are deleted`})
    } catch (error) {
        res.status(401).json({msg: error})
    }
})

export default router;