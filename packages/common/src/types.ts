import {z} from "zod"

export const zodSignupSchema = z.object({
    username: z.string().min(3).max(50),
    email:z.string().min(8).max(50).email(),
    password: z.string().min(6).max(50)
})


export const zodSignInSchema = z.object({
    email:z.string().min(8).max(50).email(),
    password: z.string().min(6).max(50)
}) 


export const zodRoomSchema = z.object({
    name: z.string().min(8).max(255)
})