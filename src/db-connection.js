import mongoose from "mongoose";
import { USER_DB, PASSWORD_DB, HOST_DB } from "./constants.js";


export const dbConnection = async () =>{
    try {
        await mongoose.connect(`mongodb+srv://${USER_DB}:${PASSWORD_DB}@${HOST_DB}/?retryWrites=true&w=majority`);
        console.log("Me conecté correctamente");

    } catch (error) {
     console.log(error);   
    }
}



