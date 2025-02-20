import express from "express"
import config from "config"
import "./utils/dbConnect.js"
// controllers routers
import userRouter from "./controllers/Users/index.js"
import freelancerRouter from "./controllers/Freelancers/index.js"
// public apis import
import userpublicRouter from "./public/users.js"
import freelancerpublicRouter from "./public/freelancers.js"

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


// public api's
app.use("/api/pubilc", userpublicRouter)
app.use("/api/public", freelancerRouter)


// private api's
app.use("/api/users", userRouter)
app.use("/api/freelancers", freelancerRouter)

app.listen(PORT, ()=> {
    console.log(`your web app is running live at port ${PORT}`);
    
})


