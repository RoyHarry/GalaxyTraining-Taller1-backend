import { userModel } from "../models/userModel.js";
import Joi from "joi";
import bcrypt from 'bcrypt';
import { createAccessToken } from "../authentication/auth.js";

export const registerUser = async (req, res)=> {

    console.log(req.body);
    const { username, email, password, role } = req.body;

    const userJoiSchema = Joi.object({
        username: Joi.string().min(4).max(20).required(),
        email: Joi.string().min(7).max(40).required(),
        password: Joi.string().min(3).max(10).required(),
        role: Joi.string().min(3).max(20).required()
    });

    const { error } = userJoiSchema.validate(req.body);

    if(error){
        return res.status(500).send({ msg : error.details[0].message });
    }

    const isTrue = await userModel.findOne({ username: username });

    if(isTrue){
        return res.status(500).send({ msg : "El usuario ya existe"});
    }    

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const passwordHash = bcrypt.hashSync(password, salt);    

    const user = new userModel({
        username: username,
        password: passwordHash,
        email: email,
        role: role
    });

    try {
        await user.save();
        const token = await createAccessToken( { username : user.username, password: user.password, email: user.email, role: user.role } );    
        res.cookie('token', token);

        res.status(201).send({ token: token })
    } catch (error) {
        res.status(500).send({ msg: "Ocurrió un error al registrar el usuario" })
    }   
}


    export const login = async (req, res)=> {

        console.log(req.body);
        const { username, password} = req.body;
    
        const userJoiSchema = Joi.object({
            username: Joi.string().min(4).max(20).required(),            
            password: Joi.string().min(3).max(10).required(),            
        });
    
        const { error } = userJoiSchema.validate(req.body);
    
        if(error){
            return res.status(500).send({ msg : error.details[0].message });
        }
    
        const user = await userModel.findOne({ username: username });
    
        if(user){

            const isTrue = bcrypt.compareSync(password, user.password); 

            if(isTrue)
            try {            
                const token = await createAccessToken( { username : user.username, password: user.password, email: user.email, role: user.role } );                
                res.cookie('token', token);
                res.status(201).send({ msg: "Se ha iniciado sesión" })
            } catch (error) {
                res.status(500).send({ msg: "Ocurrió un error al iniciar el usuario" })
            }
        }else {
            res.status(500).send({ msg: "Ocurrió un error al iniciar el usuario" })
        }        
    }