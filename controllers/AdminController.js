'use strict'
var Admin = require('../models/admin');
var bcrytp = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');


const registro_admin = async function (req, res) {
    //
    //REGISTRO:
    var data = req.body;
    var admin_arr = [];
    admin_arr = await Admin.find({ email: data.email })

    //Validar mail si existe
    if (admin_arr.length == 0) {
        //valida y encripta contraseña usando bcrypt
        if (data.password) {
            //encripta contraseña
            bcrytp.hash(data.password, null, null, async function (err, hash) {

                if (hash) {//si la contraseña esta encriptada
                    console.log(hash)
                    data.password = hash;//nuevo laor de la contraseña encriptada
                    var reg = await Admin.create(data); // Crea usuario
                    res.status(200).send({ data: reg }); //registra usuario
                } else {
                    res.status(200).send({ message: "Error Server", data: undefined });
                }

            });
        } else {
            res.status(200).send({ message: "No hay una contraseña", data: undefined });

        }

    } else {
        res.status(200).send({ message: "el correo ya existe en la base de datos", data: undefined });
    }



}

//Login Admin
const login_admin = async function (req, res) {
    var data = req.body;
    //verifica si el coreo existe en la BD
    var admin_arr = []

    admin_arr = await Admin.find({ email: data.email })//busca el mail del admin y lo encierrra en el array

    if (admin_arr.length == 0) {//si el array esta vacio no hay usuario registrado con el mail buscado
        res.status(200).send({ message: 'No se encontro el email', data: undefined })
    } else {
        //LOGIN
        let user = admin_arr[0];
        //desencripta y verifica si la contraseña coincide con la BD
        bcrytp.compare(data.password, user.password, async function (error, check) {
            if (check) {
                // console.log(user)
                res.status(200).send({ 
                    data: user,
                    token: jwt.createToken(user)
                });
            } else {
                res.status(200).send({ message: 'La contraseña no coincide', data: undefined });
            }
        });
    }
}


module.exports = {
    registro_admin,
    login_admin 
}