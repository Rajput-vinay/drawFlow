import express, { Router } from 'express'
import { deleteContent, getAllRoom, userSignIn } from "../controllers/userControllers";
import { userSignUp } from "../controllers/userControllers";
import { createRoom } from "../controllers/userControllers";
import userMiddleware from '../middlewares/userMiddlewares';
import {slug} from "../controllers/userControllers";
import { roomId } from '../controllers/userControllers';


 const router: Router = express.Router()

router.post("/signup", userSignUp);
router.post("/signin",userSignIn);
router.get("/chats/:roomId",roomId);
router.get("/room/:slug",userMiddleware,slug)
router.post("/createRoom",userMiddleware,createRoom);
router.get("/getAllRoom",userMiddleware,getAllRoom)
router.delete("/deleteContent/:roomId",userMiddleware,deleteContent)
export default router
