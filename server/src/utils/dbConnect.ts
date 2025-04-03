import mongoose from "mongoose";
import config from "config"

const DB_URL : string = config.get<string>("DB_URL")

async function dbConnect(): Promise<void> {
    try {
        await mongoose.connect(DB_URL)
        console.log(`DATABSE CONNECTED SUCCESSFULLY!✅`);
        
    } catch (error) {
        console.log(error);
        
    }
    
}

dbConnect();