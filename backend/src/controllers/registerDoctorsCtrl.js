import doctorsMdl from "../models/doctorsMdl.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const registerDoctorsController = {};

registerDoctorsController.register = async (req, res) => {
    const {name, especiality, email, password} = req.body;

    try {

        const existDoctor = await  doctorsMdl.findOne({ email });
        if (existDoctor) {
            return res.json({message: "Doctor already exist"});
        }

        const passwordHash = await bcryptjs.hash(password, 10);

        const newDoctor = new doctorsMdl({
            name,
            especiality,
            email,
            password: passwordHash
        });

        await newDoctor.save();

        jsonwebtoken.sign(
            {id: newDoctor._id},
            config.JWT.secret,
            {expiresIn: config.JWT.expiresIn},
            (error, token) => {
                if(error) console.log(error);
                res.cookie("authToken", token);
                res.json({message: "Doctor registered"})
            }
        );

    } catch (error) {
        
        console.log(error);

    }
};

export default registerDoctorsController;