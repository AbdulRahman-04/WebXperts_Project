import express from "express"

const router = express.Router();

router.get("/getallfreelancers", (req, res)=> {
    try {

        res.status(200).json({msg: `all freelancers are here`})
        
    } catch (error) {
        res.status(401).json({msg: error})
    }
})

router.get("/getonefreelancer/:id", (req, res)=>{
    try {
        res.status(200).json({msg: `one freelancer is here!`})
    } catch (error) {
        res.status(401).json({msg: error})
    }
})

router.put("/editonefreelancers/:id", (req, res)=>{
    try {
        res.status(200).json({msg: `one freelancer is edited⚡`})
        
    } catch (error) {
        res.status(401)
    }
})

router.delete("/deleteoneuser/:id", (req, res)=>{
    try {
        res.status(200).json({mgs: `one freelancer is edited`})
    } catch (error) {
        res.status(401).json({msg: error})
    }
})

router.delete("/deleteall", (req, res)=>{
    try {
        res.status(200).json({msg: `all freelancers are deleted`})
    } catch (error) {
        res.status(401).json({msg: error})
    }
})

export default router;