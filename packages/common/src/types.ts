// const { z } = require('zod');
import {z} from "zod"


export const zodSignupSchema = z.object({
    name: z.string().trim().min(3, "Name must be at least 3 characters").max(50, "Name cannot exceed 50 characters"),
    email: z.string().trim().min(8, "Email must be at least 8 characters").max(50, "Email cannot exceed 50 characters").email("Invalid email format"),
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .max(50, "Password cannot exceed 50 characters")
});

export const zodSignInSchema = z.object({
    email: z.string().trim().min(8).max(50).email("Invalid email format"),
    password: z.string().min(6).max(50)
});

export const zodRoomSchema = z.object({
    name: z.string().trim().min(3, "Room name must be at least 3 characters").max(255, "Room name cannot exceed 255 characters")
});

// module.exports = {
//     zodSignupSchema,
//     zodSignInSchema,
//     zodRoomSchema
// };
