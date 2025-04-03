import express , {Request, Response } from "express"
import config from "config"
// DATABSE CONNECTION
import "./utils/dbConnect"


const app = express()
const PORT: string = config.get<string>("PORT")

app.get("/", (req: Request, res: Response): void =>{
    try {
        res.status(200).json({msg: "HELLO IN TS💙"})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: error})
    }
})

app.listen(Number(PORT), ()=>{
    console.log(`YOUR SERVER IS LIVE AT PORT ${PORT}`);
    
})