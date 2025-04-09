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

        const verificationcode = crypto.randomBytes(3).toString("hex");

        const tokenCode = jsonwebtoken.sign(
            {email, verificationcode},
            config.JWT.secret,
            {expiresIn: "2h"}
        );

        res.cookie("verificationToken", tokenCode, {maxAge: 2*60*60*1000});

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
            subject: "Verificacion de correo electronico",
            text:
                "Para verificar tu cuenta, utiliza el siguiente codigo: " +
                verificationCode +
                "\n expira en dos horas",
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                return res.json({message: "Error sending email " + error});
            }
            console.log("Email sent "+ info);
        })
    }
}