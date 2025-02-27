import express from "express"
import freelancerModel from "../../models/Freelancers/Freelancers.js"

const router = express.Router()

router.get("/getfreelancers/:id", async (req, res)=> {
    try {
   
      let paramsId = req.params.id;
      let getOneFreelancer = await freelancerModel.findOne({_id: paramsId});
      res.status(200).json({msg: getOneFreelancer});

        
    } catch (error) {
        console.log(error.name, error.message);
        res.status(401).json({msg: error})
    }
})

router.get("/getmydetails/:id", async (req, res)=>{
    try {
        let paramsId = req.params.id
        let getDetails = await freelancerModel.findOne({_id: paramsId});
        res.status(200).json({msg: getDetails})
        
    } catch (error) {
        console.log(error.name, error.message);
        res.status(401).json({msg: error})
    }
});

router.put("/editmyprofile/:id", async (req, res)=>{
    try {
         
        let freelancerInp = req.body;
        let paramsId = req.params.id;
        await freelancerModel.updateOne({_id: paramsId}, {$set: freelancerInp})
        res.status(200).json({msg: `hey freelancer, your profile has been updated successfully!✅🙌`})
    } catch (error) {
        console.log(error.name, error.message);
        
    }
});

router.delete("/deletemyprofile/:id", async (req, res)=>{
    try {
         
        let paramsId = req.params.id;
        await freelancerModel.deleteOne({_id: paramsId});
        res.status(200).json({msg: `Profile deleted🥲`})
        
    } catch (error) {
        console.log(error.name);
        res.status(401).json({msg: error})
    }
});

export default router