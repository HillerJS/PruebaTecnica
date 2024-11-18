const { config } = require("../../config.js")

var categoriasModel = require("../modelos/categoriasModel.js").categoriasModel
var categoriasController = {}

categoriasController.Guardar     = function(request, response){
    var post = {
        codigo: request.body.codigo,
        nombre: request.body.nombre,
    }
    if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false, mensaje:"El código es un campo obligatorio"})
        return false
    }
    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El nombre es un campo obligatorio"})
        return false
    }
    categoriasModel.VerificarCodigoUnico(post, function(verifica){
        if(verifica.existe == false){
        categoriasModel.Guardar(post, function(saved){
            response.json(saved)
        })
        } else{
            response.json({state:false, mensaje:"El codigo ingresado ya existe en la BD"})
            return false
        }
    })
}
categoriasController.Listar      = function(request, response){
    categoriasModel.Listar(null, function(respuestaModelo){
        response.json(respuestaModelo)
    })
}
categoriasController.ListarId    = function(request, response){
    var post = {
        _id:request.body._id
    }
    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El _id es un campo obligatorio"})
        return false
    }
    categoriasModel.ListarId(post, function(listaModelo){
        response.json(listaModelo)
    })
}
categoriasController.Actualizar  = function(request, response){
    var post = {
        _id: request.body._id,
        nombre: request.body.nombre,
    }
    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El _id es un campo obligatorio"})
        return false
    }
    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El nombre es un campo obligatorio"})
        return false
    }
    categoriasModel.Actualizar(post, function(saved){
        if(saved.state == true){
            response.json({state: true, mensaje:"El producto fue actualizado correctamente"})
            return false
        } 
        else {
            response.json({state: false, mensaje:"El producto presento error al actualizar"})
            return false
        }
    })
}
categoriasController.Eliminar    = function(request, response){
    var post = {
        _id: request.body._id,
    }
    if(post._id == undefined || post._id == null || post._id == "" ){
        response.json({state: false, mensaje:"El campo id es un campo obligatorio"})
        return false
    }
    categoriasModel.Eliminar(post, function(saved){
        if(saved.state == true){
            response.json({state: true, mensaje:"El producto fue eliminado correctamente"})
            return false
        } 
        else {
            response.json({state: false, mensaje:"El producto presento error al eliminar"})
            return false
        }
    })
}


module.exports.categoriasController = categoriasController