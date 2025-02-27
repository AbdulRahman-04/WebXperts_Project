import express from "express"
import config from "config"
// dbImport
import "./utils/dbConnect.js"
// private apis
// import freelancerRouter from "./controllers/freelancers/freelancers.js"
import userRouter from "./controllers/users/users.js"
// middleware
import authMiddleware from "./middleware/auth.js"

// rate limit 
import rateLimit from "express-rate-limit"

// public api's
// import freelancePublic from "./controllers/public/freelancers.js"
import userPublic from "./controllers/public/users.js"

const app = express();
const PORT = config.get("PORT");

app.use(express.json());

let limiter = rateLimit({
    windowMs: 10*60*100,
    limit: 50,
    standardHeaders: true,
    legacyHeaders: false,
    message: `can't send request! please try after a while🙌`,
    statusCode: 429

})

app.get("/", (req, res)=>{
    try {

        res.status(200).json({msg: `Welcome to WebXpertz✅`})
        
    } catch (error) {
        console.log(error);
        res.status(200).json({msg: error})
    }
})

// app.use(limiter)

// public api's
// app.use("/api/public/freelancers", freelancePublic)


// rate limit
app.use("/api/public/users", userPublic)

// app.use(authMiddleware)
// middleware


// private api's
app.use("/api/private/users", userRouter);
// app.use("/api/private/freelancers", freelancerRouter)


// error handling
app.use((req, res)=>{
    res.status(200).json({msg: `router not found✅`})
})

app.listen(PORT, ()=>{
    console.log(`Your web app is running live at port ${PORT}`);
})