const mongoose = require("mongoose")
var elementosModel = {}

var Schema = mongoose.Schema
var elementosSchema = new Schema({
    codigo:String,
    nombre:String,
    color:String,
    precio:Number,
    descripcion:String,
    unidades:Number,
    imagen:String,
    categoria:String
})

const MyModel = mongoose.model("elementos", elementosSchema)

elementosModel.VerificarCodigoUnico = function(post, callback){
    
    MyModel.find({codigo:post.codigo},{}).then((respuesta) => {
        if(respuesta.length >= 1){
            return callback({existe: true})
        } 
        else{
            return callback({existe: false})
        }
    }).catch((error) => {
        console.log(error)
        return callback({state:false, error:error})
    })
}
elementosModel.Guardar              = function(post, callback){
    const instancia = new MyModel
    instancia.nombre = post.nombre
    instancia.codigo = post.codigo
    instancia.color = post.color
    instancia.precio = post.precio
    instancia.descripcion = post.descripcion
    instancia.unidades = post.unidades
    instancia.imagen  = post.imagen
    instancia.categoria  = post.categoria
    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state:true, mensaje:"Producto guardado Correctamente"})
    }).catch((error) => {
        console.log(error)
        return callback({state:false, mensaje:"Ups error al almacenar"})
    })
}
elementosModel.Listar               = function(post, callback){
    MyModel.find({},{}).then((respuesta) =>{
        return callback({state: true, datos:respuesta})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, error:error, datos:[]})
    })
}
elementosModel.Filtro               = function(post, callback){
    MyModel.find({categoria:post.filtro},{}).then((respuesta) =>{
        return callback({state: true, datos:respuesta})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, error:error, datos:[]})
    })
}
elementosModel.ListarId             = function(post, callback){
    MyModel.find({_id:post._id},{}).then((respuesta) =>{
        return callback({state: true, datos:respuesta})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, error:error, datos:[]})
    })
}
elementosModel.Actualizar           = function(post, callback){
    MyModel.findOneAndUpdate({_id:post._id},{
        nombre:post.nombre,
        color:post.color,
        precio:post.precio,
        descripcion:post.descripcion,
        unidades:post.unidades,
        imagen:post.imagen,
        categoria:post.categoria
    }).then((respuesta) => {
        return callback({state: true})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, error:error})
    })
}
elementosModel.Eliminar             = function(post, callback){
    MyModel.findOneAndDelete({_id:post._id}).then((respuesta) => {
        console.log(respuesta)
        return callback({state: true})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, error:error})
    })
}


module.exports. elementosModel =  elementosModel