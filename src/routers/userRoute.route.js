import { Router } from "express";
import { registerUser, login } from "../controllers/registerUser.controller.js";

export const routerUser = Router();

routerUser.post('/registerUser', registerUser);
routerUser.post('/loginUser', login);