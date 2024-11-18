const { config } = require("../../config.js")

var productosModel = require("../modelos/productosModel.js").productosModel
var productosController = {}

productosController.Guardar     = function(request, response){
    var post = {
        codigo: request.body.codigo,
        nombre: request.body.nombre,
        color: request.body.color,
        precio: request.body.precio,
        descripcion: request.body.descripcion,
        unidades: request.body.unidades,
        imagen: request.body.imagen,
    }
    if(post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false, mensaje:"El código es un campo obligatorio"})
        return false
    }
    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El nombre es un campo obligatorio"})
        return false
    }
    if(post.color == undefined || post.color == null || post.color == ""){
        response.json({state:false, mensaje:"El color es un campo obligatorio"})
        return false
    }
    if(post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({state:false, mensaje:"El precio es un campo obligatorio"})
        return false
    }
    if(post.descripcion == undefined || post.descripcion == null || post.descripcion == ""){
        response.json({state:false, mensaje:"El descripcion es un campo obligatorio"})
        return false
    }
    if(post.unidades == undefined || post.unidades == null || post.unidades == ""){
        response.json({state:false, mensaje:"Unidades es un campo obligatorio"})
        return false
    }
    if(post.imagen == undefined || post.imagen == null || post.imagen == ""){
        response.json({state:false, mensaje:"Imagen es un campo obligatorio"})
        return false
    }
    productosModel.VerificarCodigoUnico(post, function(verifica){
        if(verifica.existe == false){
        productosModel.Guardar(post, function(saved){
            response.json(saved)
        })
        } else{
            response.json({state:false, mensaje:"El codigo ingresado ya existe en la BD"})
            return false
        }
    })
}
productosController.Listar      = function(request, response){
    productosModel.Listar(null, function(respuestaModelo){
        response.json(respuestaModelo)
    })
}
productosController.ListarId    = function(request, response){
    var post = {
        _id:request.body._id
    }
    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El _id es un campo obligatorio"})
        return false
    }
    productosModel.ListarId(post, function(listaModelo){
        response.json(listaModelo)
    })
}
productosController.Actualizar  = function(request, response){
    var post = {
        _id: request.body._id,
        nombre: request.body.nombre,
        color: request.body.color,
        precio: request.body.precio,
        descripcion: request.body.descripcion,
        unidades: request.body.unidades,
        imagen: request.body.imagen
    }
    if(post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El _id es un campo obligatorio"})
        return false
    }
    if(post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El nombre es un campo obligatorio"})
        return false
    }
    if(post.color == undefined || post.color == null || post.color == ""){
        response.json({state:false, mensaje:"El color es un campo obligatorio"})
        return false
    }
    if(post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({state:false, mensaje:"El precio es un campo obligatorio"})
        return false
    }
    if(post.descripcion == undefined || post.descripcion == null || post.descripcion == ""){
        response.json({state:false, mensaje:"Descripcion es un campo obligatorio"})
        return false
    }
    if(post.unidades == undefined || post.unidades == null || post.unidades == ""){
        response.json({state:false, mensaje:"Unidades es un campo obligatorio"})
        return false
    }
    if(post.imagen == undefined || post.imagen == null || post.imagen == ""){
        response.json({state:false, mensaje:"Imagen es un campo obligatorio"})
        return false
    }
    if(post.tipo == undefined || post.tipo == null || post.tipo == ""){
        response.json({state:false, mensaje:"tipo es un campo obligatorio"})
        return false
    }
    productosModel.Actualizar(post, function(saved){
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
productosController.Eliminar    = function(request, response){
    var post = {
        _id: request.body._id,
    }
    if(post._id == undefined || post._id == null || post._id == "" ){
        response.json({state: false, mensaje:"El campo id es un campo obligatorio"})
        return false
    }
    productosModel.Eliminar(post, function(saved){
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


module.exports.productosController = productosController