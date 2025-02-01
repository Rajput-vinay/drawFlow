import express, { Router } from 'express'
import { userSignIn } from "../controllers/userControllers";
import { userSignUp } from "../controllers/userControllers";
import { createRoom } from "../controllers/userControllers";
import userMiddleware from '../middlewares/userMiddlewares';

 const router: Router = express.Router()

router.post("/signup", userSignUp);
router.post("/signin",userSignIn);
router.post("/createRoom",userMiddleware,createRoom);

export default router
