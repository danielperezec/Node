// importamos mongoose para importar y definir el esquema 
const mongoose = require("mongoose");
// definimosn el schema 

const accessTokenSchema = new mongoose.Schema({
    user: {
        type: String, 
        required: true,
        unique:true
    },
    key: String,
    creationDate: Date,
    expirationDate: String,
    active: Boolean


    
})

// Exportamos el module para userlo en todas partes 
module.exports = mongoose.model('accesstoken', accessTokenSchema)




// 'use strict'

// const mongoose = require('mongoose');

// var Schema = mongoose.Schema;

// var UserSchema = Schema({
//     ideuser:Number,
//      age: Number,
//      lastname: String,
//      name: String,
//      email: String

// });

// module.exports= mongoose.model('usuarios',UserSchema)