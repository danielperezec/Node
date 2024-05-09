// Importamos express y creamos un router.
const {validationResult, body} = require('express-validator');
const express = require("express")
const router = express.Router()

// Importamos el controlador de usuarios.
const userController = require("../controllers/userController")

const middleware = require("../middleware/verifyToken")
// Definir las rutas para el CRUD de usuarios.
// get
router.get("/",middleware.tokenVerify, userController.getAllUsers) // Ruta para obtener todos los usuarios
// get by id 
router.get("/:id",middleware.tokenVerify,userController.getUserbyID) // get user by id 


// post
router.post("/",middleware.tokenVerify, [
    body("id").not().isEmpty(),
    body("nombrePropietario").not().isEmpty(),
    body("marcaAutomovil").not().isEmpty(),
    body("precio").not().isEmpty(),
    body("email").not().isEmpty(),
    body("password").not().isEmpty()], userController.createUser) // Ruta para crear un usuario


// put or update
router.put("/:id",middleware.tokenVerify,[
    body("id").not().isEmpty(),
    body("nombrePropietario").not().isEmpty(),
    body("marcaAutomovil").not().isEmpty(),
    body("precio").not().isEmpty(),
    body("email").not().isEmpty(),
    body("password").not().isEmpty()], userController.updateUser) // Ruta para actualizar un usuario

// delete
router.delete("/:id",middleware.tokenVerify, userController.deleteUser) // Ruta para eliminar un usuario



// Exportamos el router para su uso en otras partes
module.exports = router