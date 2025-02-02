import express, { Router } from 'express'
import { userSignIn } from "../controllers/userControllers";
import { userSignUp } from "../controllers/userControllers";
import { createRoom } from "../controllers/userControllers";
import userMiddleware from '../middlewares/userMiddlewares';
import {slug} from "../controllers/userControllers";
import { roomId } from '../controllers/userControllers';


 const router: Router = express.Router()

router.post("/signup", userSignUp);
router.post("/signin",userSignIn);
router.post("/createRoom",userMiddleware,createRoom);
router.get("/chats/:roomId",roomId);
router.get("/room/:slug",slug)
export default router
