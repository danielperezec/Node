// imprtamos express y rutas de usuario y conexion a db
'use strict'

const express = require("express");

const connectDB = require("./db/db");

// importamos rutas
const userRoutes=require("./routes/userRoutes");
const authRoutes=require("./routes/authRoutes");
const sessionRoutes=require("./routes/sessionRoutes");

// creamos una instacia de express
const app = express();
const PORT = 3300;

// middleware
app.use(express.json())   

// Routes de usuarios
app.use("/users", userRoutes) 

// rutas de autentificacion
app.use("/",authRoutes)
app.use("/",sessionRoutes)



// inicializamons el servidor y ponemos escuha 
connectDB()

// inicializamos el servidor y lo ponemos a eschuar el puerto al que esta conectado

app.listen(PORT,()=>{
    console.log("servidor conectado al puerto " + PORT);
})