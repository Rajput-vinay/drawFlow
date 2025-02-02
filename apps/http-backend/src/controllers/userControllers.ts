import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { zodSignupSchema, zodSignInSchema, zodRoomSchema } from "@repo/common/types";
import dotenv from "dotenv"
dotenv.config()
import uuid4 from "uuid4";
import {prismaClient} from "@repo/database/client"
// User Sign-Up
export const userSignUp = async (req: Request, res: Response):Promise<any> => {
  const result = zodSignupSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Data not in proper format",
      errors: result.error.errors,
    });
  }

  try {
    const { email, password, name } = result.data;

    // Check if the user already exists
    const existingUser = await prismaClient.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    await prismaClient.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });


  

    return res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error: any) {
    console.error("Error in userSignUp:", error);
    return res.status(500).json({
      message: "Server error",
      errors: error.message,
    });
  }
};

// User Sign-In
export const userSignIn = async (req: Request, res: Response): Promise<any> => {
  const result = zodSignInSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Data not in proper format",
      errors: result.error.errors,
    });
  }

  try {
    const { email, password } = result.data;

    // Find the user by email
    const user = await prismaClient.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({
        message: "User not found. Please sign up first.",
      });
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // Generate JWT
    const jwtSecret = process.env.JWT_SECRET;
    console.log(jwtSecret)
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not set in environment variables.");
    }

    const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: "12h" });

    return res.status(200).json({
      message: "Successfully logged in",
      token,
    });
  } catch (error: any) {
    console.error("Error in userSignIn:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// Create a room
export const createRoom = async (req: Request, res: Response): Promise<any> => {
    // Validate the input against the schema
    const result = zodRoomSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Data not in proper format",
        errors: result.error.errors,
      });
    }
  
    try {
      // Check if userId is present in the request
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({
          message: "User not authenticated",
        });
      }
  
      const room = await prismaClient.room.create({
        data: {
          slug: result.data.name,
          adminId: userId,
        },
      });
     
      // Return the room ID
      return res.status(201).json({
        roomId : room.id,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  };


  //  get roomId

 export const roomId = async (req: Request, res: Response): Promise<any> => {
    try {
      // check if user Id is present in the request 

      const userId = req.userId;
      if( !userId){
        return res.status(401).json({
          message:"user not authenticated"
        });
      }

      // get the room id from the request
      const roomId = Number(req.params.roomId);

      if(!roomId){
        return res.status(400).json({
          message:"Room id is required"
        });
      }

      const message = await prismaClient.room.findMany({
        where:{
          id:roomId
        },
        orderBy:{
          id:"desc"
        },
        take:1000

      });

      res.status(200).json({  
        message
      });
    }
    catch(error: any){
      return res.status(500).json({
        message:"server error",
        error: error.message
      });
    }
  }


  export const slug = async (req: Request, res: Response): Promise<any> => {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({
          message: "User not authenticated",
        });
      }
  
      const slug = req.params.slug;
      if (!slug) {
        return res.status(400).json({
          message: "Slug is required",
        });
      }
  
      const room = await prismaClient.room.findUnique({
        where: {
          slug,
        },
      });
  
      if (!room) {
        return res.status(404).json({
          message: "Room not found",
        });
      }
  
      return res.status(200).json({
        room
      });
    } catch (error: any) {
      return res.status(500).json({
        message: "Server error",
        error: error.message,
      });
    }
  }
