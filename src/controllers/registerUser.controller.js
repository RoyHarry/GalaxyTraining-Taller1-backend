import { userModel } from "../models/userModel.js";

export const registerUser = async (req, res)=> {

    console.log(req.body);
    const { username, email, password, role } = req.body;

    const user = new userModel({
        username: username,
        password: password,
        email: email,
        role: role
    });

    try {
        await user.save();    
        res.status(201).send({ msg: "El usuario se registró correctamente" })
    } catch (error) {
        res.status(500).send({ msg: "Ocurrió un error al registrar el usuario" })
    }
}