const { config } = require("../../config.js")
var usuariosModel = require("../modelos/usuariosModel.js").usuariosModel
var nodemailer = require('nodemailer')
var usuariosController = {}

usuariosController.Guardar = function(requests, response){
    
    var post = {
        nombre:requests.body.nombre,
        email:requests.body.email,
        password:requests.body.password
    }
    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }
    if(post.nombre.length > 30){
        response.json({state:false, mensaje:"El campo nombre máximo 30 caracteres"})
            return false
    }
    if(post.nombre.length <1){
        response.json({state:false, mensaje:"El campo nombre debe ser mínimo 1 caracter"})
            return false
    }
    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje:"El campo email es obligatorio"})
        return false
    }
    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje:"El campo password es obligatorio"})
        return false
    }
    const regex = /^(?=.*[A-Z])(?=(.*\d){2,}).{6,}$/;
    if(regex.test(post.password) == false){
        response.json({state: false, mensaje:"El campo password debe contener al menos 2 dígitos, una mayúscula y debe ser longitud mínima de 6"})
        return false
    }
    post.password = SHA256(post.password + config.encriptado)

        usuariosModel.verificarEmail(post, function(verif){
            if(verif.continuar =="Si"){
                usuariosModel.Guardar(post,function(respuestaModelo){
                    response.json(respuestaModelo)
                })
            } 
            else {
                response.json({state:false,mensaje:"Este Email ya existe en la BD"})
            }
    })
}
usuariosController.Listar = function(requests, response){
    usuariosModel.Listar(null, function(respuestaModelo){
        response.json(respuestaModelo)
    })
}
usuariosController.Actualizar = function(requests, response){
    var post = {
        _id: requests.body._id,
        nombre:requests.body.nombre,
    }
    if(post._id == undefined || post._id == null || post._id == ""){
        return false
    }
    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        return false
    }
    usuariosModel.Actualizar(post, function(actualiza){
        if(actualiza.state == true){
            response.json({state:true,mensaje:"Usuario Actualizado correctamente"})
        }
        else{
            response.json({state:false,mensaje:"Error al Actualizar"})
        }
    })
}
usuariosController.ListarId = function(requests, response){
    var post = {
        _id: requests.body._id,
    }
    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El campo mail es obligatorio"})
        return false
    }

    usuariosModel.ListarId(post, function(respuestaModelo){
        response.json(respuestaModelo)
    })
}
usuariosController.Eliminar = function(requests, response){
    var post = {
        _id: requests.body._id,
    }
    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El campo mail es obligatorio"})
        return false
    }
    usuariosModel.Eliminar(post, function(eliminarcuent){
        if(eliminarcuent.state == true){
            response.json({state:true,mensaje:"Usuario Eliminado correctamente"})
        }
        else{
            response.json({state:false,mensaje:"Error al Eliminar"})
        }
    })
}

usuariosController.Login = function(requests, response){
    var post = {
        email:requests.body.email,
        password:requests.body.password
    }
    if(post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje:"El campo email es obligatorio"})
        return false
    }
    if(post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje:"El campo password es obligatorio"})
        return false
    }
    post.password = SHA256(post.password + config.encriptado)
    
    usuariosModel.Login(post, function(respuesta){
        response.json(respuesta)
    })
}
module.exports.usuariosController = usuariosController