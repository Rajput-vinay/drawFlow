import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config()


// Middleware to check if the user is logged in
const userMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<any> =>{

   try {
      console.log("req.headers.authorization",req.headers.authorization)
      const token= req.headers.authorization?.split(" ")[1]; 
      
 
      if(!token){
         return res.status(401).json({
             message: "User not logged in",
           });
      }
      
      const jwtSecret = process.env.JWT_SECRET as string
      const decoded = jwt.verify(token, jwtSecret)
 
      if(!decoded){
         return res.status(402).json({
             message: "decode token not found"
         })
      }
 
      req.userId = (decoded as JwtPayload).userId
    console.log("decoded",decoded)  
      next()
   } catch (error) {
    console.log("error from middleware", error)
    return res.status(500).json({
        message:"token not found"
    })
   }
} 

export default userMiddleware