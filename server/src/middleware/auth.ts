import jwt from "jsonwebtoken"
import config from "config"
import { Request, Response , NextFunction } from "express"

const KEY: string = config.get<string>("JWT_KEY")

interface authRequest extends Request {
    user?: any
}

const authMiddleware = (req: authRequest, res: Response, next: NextFunction):void =>{
   
    const authHeader : string | undefined = req.headers["authorization"]

        if(!authHeader){
            res.status(404).json({msg: "no token provided"})
          return
        }

        const token : string = authHeader.split(" ")[1]

   
    try {

        const decoded = jwt.verify(token, KEY)

        req.user = decoded


        next()
        


        
    } catch (error) {
        console.log(error);
        
    }
}

export default authMiddleware