'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'diegoararca';

exports.createToken = function(user) {
    //cracion del token
    var payload ={//datos del usuario
        sub:user._id,
        nombres: user.nombre,
        apellidos: user.apellidos,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(7, 'days').unix() //tiempo de exiracion 1 semana
    }
    return jwt.encode(payload, secret)
}



