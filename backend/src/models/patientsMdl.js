/*
    nombre
    edad
    correo
    contraseña
    telefono
    isVerified
*/

import {Schema, model} from "mongoose";

const patientsSchema = new Schema ({
    name: {
        type: String,
        require: true
    },
    
    age: {
        type: Number,
        require: true
    },

    email: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    },

    telephone: {
        type: String,
        require: true
    },

    isVerified: {
        type: Boolean,
        require: true
    }
}, {
    timestamps: true,
    strict: false
})

export default model("patients", patientsSchema);