import express from "express"
import FreelancerModel from "../../models/Freelancers/Freelancers.js";

const router = express.Router();

    router.get("/getallfreelancers", async (req, res)=> {
        try {
            let getAll = await FreelancerModel.find({})
            res.status(200).json(getAll)
            
        } catch (error) {
            res.status(401).json({msg: error})
        }
    })

    router.get("/getonefreelancer/:id", async (req, res) => {
        try {
            let paramsId = req.params.id;
            let getOne = await FreelancerModel.findOne({ _id: paramsId });

            if (!getOne) {
                return res.status(404).json({ msg: "Freelancer not found" });
            }

            res.status(200).json(getOne); 
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    });


router.put("/editonefreelancer/:id", async (req, res) => {
    try {
        let paramsId = req.params.id;
        let userInp = req.body;

        await FreelancerModel.updateOne({ _id: paramsId }, { $set: userInp });

        // Fetch updated freelancer data
        let updatedFreelancer = await FreelancerModel.findOne({ _id: paramsId });

        res.status(200).json({
            msg: "Freelancer updated successfully ⚡",
            updatedFreelancer, // Sending updated data back
        });
    } catch (error) {
        console.error("❌ Error in updating freelancer:", error);
        res.status(500).json({ msg: "Server error" });
    }
});


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