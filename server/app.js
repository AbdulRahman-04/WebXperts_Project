import express from "express"
import config from "config"
import "./utils/dbConnect.js"
// controllers routers
import users from "./controllers/Users/index.js"
import freelancers from "./controllers/Freelancers/index.js"

const app = express();
const PORT = config.get("PORT") || 5044;

app.use(express.json())

app.get("/", (req, res)=>{
    try {

        res.status(200).json({msg: 'welcome to backend of WebXperts!'})
        
    } catch (error) {
        res.status(401).json({msg: error})
    }
})


// private api's
app.use("/api/users", users)
app.use("/api/freelancers", freelancers)

app.listen(PORT, ()=> {
    console.log(`your web app is running live at port ${PORT}`);
    
})


