import jwt from "jsonwebtoken"
import config from "config"

const KEY = config.get("KEY");

const authMiddleware = (req, res, next) => {
    let authHeader = req.headers["authorization"];
    console.log(authHeader);

    let token = authHeader.split(" ")[1];

    try {

        let decoded = jwt.verify(token, KEY);
        next();
        
    } catch (error) {
        console.log(error.name);
        console.log(error.message);
        
        
    }
    
}

export default authMiddleware