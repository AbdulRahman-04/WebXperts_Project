import jwt from "jsonwebtoken"
import config from "config"

let JWT_KEY = config.get("JWT_KEY");

const authMiddleware = (req, res, next) => {
    let authHeader = req.headers["authorization"];
    console.log(authHeader);

    let token = authHeader.split(" ")[1];

    try {

        let decoded = jwt.verify(token, JWT_KEY);
        req.user = decoded;
        next()
        
    } catch (error) {
        console.log(error);
    }
    
}

export default authMiddleware