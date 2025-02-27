import mongoose from "mongoose";
import config from "config"

async function dbConnect() {

    try {
        
        await mongoose.connect(config.get("DB_URL"));
        console.log(`YOUR DATABASE HAS BEEN CONNECTED!✅`);
        

        
    } catch (error) {
        console.log(error);
        
    }
    
}

dbConnect()