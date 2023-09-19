import express from "express";
import { routerUser } from "./routers/userRoute.route.js";
import { dbConnection } from "./db-connection.js";
import bodyParser from "body-parser";

export const app = express();


await dbConnection();

app.use(bodyParser.json());
app.use(routerUser)

app.listen(3000);