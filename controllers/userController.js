// importamos modelo de mongo 
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require("../models/User");


// funcion para obtener todos los usuarios 
function getAllUsers(req, res) {
    // utilizamos metodo find() de mongoose 
    User.find()
        .then(
            users => res.json(users)
        ) // Enviamos todos los usuarios como respuesta.
        .catch(
            err => {
                console.error(err)
                res.status(500).send("Error al obtener usuarios")
            })
}

// getUser by id
function getUserbyID(req, res) {
    var params = req.params;
    var id = params.id;

    User.findOne({ id: parseInt(id) })
        .then(user => {
            return res.status(200).send({
                status: 200,
                message: "usuario encontrado",
                data: user
            });
        })
        .catch(error => {
            return res.status(500).send({
                status: 500,
                message: "Error detectato"
            })
        })
}

// funcion para crear nuevo usuario

function createUser(req, res) {

    // extraemos la info del cuerpo de la solisitud 
    const { id, nombrePropietario, marcaAutomovil, precio, email, password } = req.body;
    // creamos nuevo usuario 
    User.create({ id, nombrePropietario, marcaAutomovil, precio, email, password })
        .then(
            (newUser) => res.status(201).json(newUser)// enviamos el nuevo usuario como formao json
        )
        .catch(
            (err) => {
                console.log(err);
                res.status(500).send('error al crear usuario')
            }
        )

    // const errors = validationResult(req);
    // if (!errors.isEmpty) {
    //     return res.status(400).send({
    //         status: 400,
    //         errors: errors.array()
    //     })
    // }

    // var data = req.body;

    // // usuaraios existentes
    // User.findOne({ id: data.id })
    //     .then(usuarios => {
    //         // valida el usuario dupplicado
    //         if (usuarios) {

    //             return res.status(400).send({
    //                 status: 400,
    //                 message: "usuarios ya existente",

    //             });
    //         };

    //         // hasheado de password
    //         const saltRounds = 10;

    //         bcrypt.genSalt(saltRounds, function (err, salt) {
    //             bcrypt.hash(salt, function (err, hash) {
    //                 // Store hash in your password DB.
    //                 var create_user = new User();
    //                 create_user.id = data.id;
    //                 create_user.nombrePropietario = data.nombrePropietario;
    //                 create_user.marcaAutomovil = data.marcaAutomovil;
    //                 create_user.precio = data.precio;
    //                 create_user.email = data.email;
    //                 create_user.password = hash;

    //                 create_user.save()
    //                     .then((result) => {
    //                         return res.status(200).send({
    //                             status: 200,
    //                             message: "usuarios listados",
    //                             data: result
    //                         });
    //                     })
    //                     .catch(error => {
    //                         console.error(error);
    //                         return res.status(500).send({
    //                             status: 500,
    //                             message: "error detectado",
    //                         });
    //                     });
    //             });
    //         });
    //     })
    //     .catch(error => {
    //         console.error(error);
    //         return res.status(500).send({
    //             status: 500,
    //             message: "error detectado",
    //         });
    //     });



}

// funcion para actualizar usuario 
function updateUser(req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).send({
            status: 400,
            errors: errors.array()
        })
    }

    var params = req.params;
    var id = params.id;

    var data = req.body;
    var update_user = {
        id: data.id,
        nombrePropietario: data.nombrePropietario,
        marcaAutomovil: data.marcaAutomovil,
        precio: data.precio,
        email: data.email,
        password: data.password
    }

    User.findOneAndUpdate({ id: parseInt(id) }, update_user)
        .then(usuarios => {

            return res.status(200).send({
                status: 200,
                message: "Usuario Actualizado",
                data: usuarios
            });
        })
        .catch(error => {
            console.error(error);
            return res.status(500).send({
                status: 500,
                message: "error detectado",
            });
        });
}

//  funcion para delete user
function deleteUser(req, res) {
    var params = req.params;
    var id = params.id;
    User.findOneAndDelete({ id: parseInt(id) })
        .then(usuarios => {
            console.log(usuarios);
            return res.status(200).send({
                status: 200,
                message: "Usuario Eliminado",
                data: usuarios
            });
        })
        .catch(error => {
            console.error(error);
            return res.status(500).send({
                status: 500,
                message: "error detectado",
            });
        });

}

module.exports = {
    getAllUsers,
    getUserbyID,
    deleteUser,
    updateUser,
    createUser
}
