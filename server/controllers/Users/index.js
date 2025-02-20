import express from "express"

const router = express.Router();

router.get("/getallusers", (req, res)=> {
    try {

        res.status(200).json({msg: `all users are here`})
        
    } catch (error) {
        res.status(401).json({msg: error})
    }
})

router.get("/getoneuser", (req, res)=>{
    try {
        res.status(200).json({msg: `one user is here!`})
    } catch (error) {
        res.status(401).json({msg: error})
    }
})

router.put("/editoneuser", (req, res)=>{
    try {
        res.status(200).json({msg: `one user is edited⚡`})
        
    } catch (error) {
        res.status(401)
    }
})

router.delete("/deleteoneuser", (req, res)=>{
    try {
        res.status(200).json({mgs: `one user is edited`})
    } catch (error) {
        res.status(401).json({msg: error})
    }
})

router.delete("/deleteall", (req, res)=>{
    try {
        res.status(200).json({msg: `all users are deleted`})
    } catch (error) {
        res.status(401).json({msg: error})
    }
})

export default router;