import express from "express";
import { singin, singup } from "../controllers/auth";

const userRouter = express.Router();

userRouter.post("/singup", singup);
userRouter.post("/singin", singin);

export default userRouter;
