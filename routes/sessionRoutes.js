// Importamos express y creamos un router.

const express = require("express");
const router = express.Router();

// Importamos el controlador de sessionRouter.

const sessionController = require("../controllers/sessionController");

const middleware = require("../middleware/verifyToken");

// Ruta protegida para obtener informacion sobre el usuario que inicio sesion.

router.get("/currentUser", middleware.tokenVerify, sessionController.getCurrentUser); // Ruta protegida para obtener informacion del usuario que esta conectado actualmente

module.exports = router;