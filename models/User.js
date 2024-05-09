// importamos mongoose para importar y definir el esquema 
const bcrypt=require("../servicio/bcrypt")
const mongoose = require("mongoose");
// definimosn el schema 

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },

    nombrePropietario: {
        type: String,
        required: true
    },

    marcaAutomovil: {
        type: String,
        required: true
    },

    precio: {
        type: Number,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
})

// hashed password
userSchema.pre("save",function(next){
    if(!this.isModified("password")){
        return next();
    }
    bcrypt
    .hashPassword(this.password)
    .then((hashedPassword)=>{
        this.password = hashedPassword;
        next();
    })
    .catch((error)=>{
        console.error(error);
        next(error);
    });
})

// crear modelo de usr 
const User= mongoose.model('User', userSchema)

// Exportamos el module para userlo en todas partes 
module.exports = User

