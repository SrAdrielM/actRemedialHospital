import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";

import doctorsMdl from "../models/doctorsMdl.js";
import patientsMdl from "../models/patientsMdl.js";

import { config } from "../config.js"

const loginController = {}

loginController.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        let userFound;
        let userType;

        //1- ADMIN
        if(email === config.emailAdmin.email && password === config.emailAdmin.password){
            userType = "admin",
            userFound ={_id: "admin"}
        }else{
            //2- doctores
            userFound = await doctorsMdl.findOne({})
            userType = "doctor"

            if(!userFound){
                userFound = await patientsMdl.findOne({email})
                userType = "paciente"
            }
        }

        //USUARIO NO ENCONTRADO
        if(!userFound){
            console.log("el usuario no ha sido encontrado")
            return res.json({message: "user not found"})
        }

        //validar la contraseña, solo si no es admin
        if(userType !== "admin"){
            const isMatch = bcryptjs.compare(password, userFound.password)
            if(!isMatch){
                return res.json({message: "contraseña incorrecta"})
            }
        }

        // TOKEN
        jsonwebtoken.sign(
            //1- que voy a guardar
            {id: userFound._id, userType},
            //2- Secreto
            config.JWT.secret,
            //3- cuando expira
            {expiresIn: config.JWT.expiresIn},
            //4- Funcion flecha
            (error, token) => {
                if(error) console.log(error)

                res.cookie("authToken", token)
                res.json({message: "login successful " + userType + ": " + email})
            }
        )

    } catch (error) {
        res.json({message: "error"+error})
    }
}

export default loginController;