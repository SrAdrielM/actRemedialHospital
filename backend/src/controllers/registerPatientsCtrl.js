import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";
import patientsMdl from "../models/patientsMdl.js";
import { config } from "../config.js";
import { register } from "module";

const registerPatientsController = {};

registerPatientsController.register = async (req, res) => {
    const {name, age, email, password, telephone, isVerified} = req.body;

    try {
        const existingPatient = await patientsMdl.findOne({email});
    
        if (existingPatient) {
            return res.json({message: "Patient already exist"});
        }
    
        const passwordHash = await bcryptjs.hash(password, 10);
    
        const newPatient = new patientsMdl({
            name,
            age,
            email,
            password: passwordHash,
            telephone,
            isVerified: isVerified || false
        });
    
        await newPatient.save();
    
        const verificationCode = crypto.randomBytes(3).toString("hex");
    
        const tokenCode = jsonwebtoken.sign(
            {email, verificationCode},
            config.JWT.secret,
            {expiresIn: "2h"}
        );
    
        res.cookie("verificationToken", tokenCode, {maxAge: 2 * 60 * 60 * 1000});
    
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.email_user,
                pass: config.email.email_pass
            },
        });
    
        const mailOptions = {
            from: config.email.email_user,
            to: email,
            subject: "Verificación de correo electrónico",
            text: 
                "Para verificar tu cuenta, utiliza el siguiente código: " + 
                verificationCode + 
                "\n expira en dos horas",
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.json({message: "Error sending email " + error});
            }
            console.log("Email sent " + info);
        });
    
        res.json({
            message: "Client registered, Please verify your email with the code sent"
        });
    } catch (error) {  // Ahora manejamos correctamente el error
        console.log("Error: " + error);  // Imprimimos el error correctamente
    };
    
    registerPatientsController.verifyCodeEmail = async (req, res) => {
        const {requireCode} = req.body;
    
        const token = req.cookies.verificationToken;
    
        try {
            const decoded = jsonwebtoken.verify(token, config.JWT.secret);
            const {email, verificationCode: storedCode} = decoded;
    
            if (requireCode !== storedCode) {
                return res.json({message: "Invalid Code"});
            }
    
            const patient = await patientsMdl.findOne({email});
            patient.isVerified = true;
            await patient.save();
    
            res.clearCookie("verificationToken");
    
            res.json({message: "Email verified successfully"});
    
        } catch (error) {  // También corregimos aquí
            console.log("Error: " + error);  // Imprimimos el error correctamente
        }
    };
    
}

export default registerPatientsController;