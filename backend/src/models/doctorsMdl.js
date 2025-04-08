/*
    nombre
    especialidad
    correo
    contraseña
*/

import {Schema, model} from "mongoose";

const doctorsSchema = new Schema ({
    name: {
        type: String,
        require: true
    },
    
    especiality: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    strict: false
})

export default model("doctors", doctorsSchema);