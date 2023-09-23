import Jwt from 'jsonwebtoken';
import { SECRET_TOKEN } from '../constants.js';

export const createAccessToken = async (payload)=>{

    return new Promise ( (resolve, reject)=>{

        Jwt.sign(payload, SECRET_TOKEN, {
            expiresIn : "1d"
        }, (error, encoded) => {

            if(error) reject("el token no es válido");
            
            resolve(encoded);
        }
        )
    });    
}