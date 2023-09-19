import { Router } from "express";
import { registerUser } from "../controllers/registerUser.controller.js";

export const routerUser = Router();

routerUser.post('/registerUser', registerUser);