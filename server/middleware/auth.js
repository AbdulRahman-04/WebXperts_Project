import jwt from "jsonwebtoken";
import config from "config";

const KEY = config.get("KEY");

const authMiddleware = (req, res, next) => {
    let authHeader = req.headers["authorization"];
    
    // ✅ Check if authHeader is missing
    if (!authHeader) {
        return res.status(401).json({ error: "No token provided ❌" });
    }

    console.log("Auth Header:", authHeader);

    let token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Invalid token format ❌" });
    }

    try {
        let decoded = jwt.verify(token, KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("JWT Error:", error.name);
        return res.status(403).json({ error: "Invalid or expired token ❌" });
    }
};

export default authMiddleware;
