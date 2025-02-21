import express from "express"
import config from "config"
import "./utils/dbConnect.js"
// private api's
import userRouter from "./controllers/Users/index.js"
import freelancerRouter from "./controllers/Freelancers/index.js"
// public apis import
import userpublicRouter from "./controllers//public/users.js"
import freelancerpublicRouter from "./controllers/public/freelancers.js"
// ratelimit
import ratelimit from "express-rate-limit"
import authMiddleware from "./middleware/auth.js"
const app = express();
const PORT = config.get("PORT") || 5044;

app.use(express.json())

let limiter = ratelimit({
    windowMs: 5*60*100,
    limit: 50,
    standardHeaders: true,
    legacyHeaders: false,
    message: "cannot send request! wait for server to respond",
    statusCode: 429
})

app.get("/", (req, res)=>{
    try {

        res.status(200).json({msg: 'welcome to backend of WebXperts!'})
        
    } catch (error) {
        res.status(401).json({msg: error})
    }
})


// public api's
app.use("/api/public", userpublicRouter)
app.use("/api/public", freelancerpublicRouter)

// rate limit
app.use(limiter)

// jwt auth middleware
//  app.use(authMiddleware)

// private api's
app.use("/api/users", userRouter)
app.use("/api/freelancers", freelancerRouter)

app.listen(PORT, ()=> {
    console.log(`your web app is running live at port ${PORT}`);
    
})


