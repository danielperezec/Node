// importamos mooongoo para crear la coneccion 
const mongoose = require("mongoose")
require('dotenv').config();

// conectamos la db usando metodo conecct()de moongoo
const mongoUrl = "mongodb+srv://"+process.env.USERDATABASE+":"+process.env.PASSWORDDATABASE+"@"+process.env.HOSTDATABASE+"/"+process.env.DATABASE

//  Funcion para conectarnos a la DB

function connectDB() {
    return new Promise((res, rej) => {
        // Conectar a la base de datos usando la URL proporcioanada
        mongoose.connect(mongoUrl)
            .then(() => {
                console.log("Conexion a la DB establecida correctamente");
                // Si la conexion es exitosa resolvemos la promesa-
                res();
            })
            .catch((err) => {
                // Si hay un error al conectar, imprimir el error y rechazar la promesa
                console.error("Error al conectar a la DB ", err);
                rej(err);
            });
    });
}
//Exportamos la funcion de la conexion a la base de datos para poder utilizarla en el app.js
module.exports = connectDB;