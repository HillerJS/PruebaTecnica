const mongoose = require("mongoose")
var productosModel = {}

var Schema = mongoose.Schema
var productosSchema = new Schema({
    codigo:String,
    nombre:String,
    color:String,
    precio:Number,
    descripcion:String,
    unidades:Number,
    imagen:String,
})

const MyModel = mongoose.model("productos", productosSchema)

productosModel.VerificarCodigoUnico = function(post, callback){
    
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
productosModel.Guardar              = function(post, callback){
    const instancia = new MyModel
    instancia.nombre = post.nombre
    instancia.codigo = post.codigo
    instancia.color = post.color
    instancia.precio = post.precio
    instancia.descripcion = post.descripcion
    instancia.unidades = post.unidades
    instancia.imagen  = post.imagen
    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state:true, mensaje:"Producto guardado Correctamente"})
    }).catch((error) => {
        console.log(error)
        return callback({state:false, mensaje:"Ups error al almacenar"})
    })
}
productosModel.Listar               = function(post, callback){
    MyModel.find({},{}).then((respuesta) =>{
        return callback({state: true, datos:respuesta})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, error:error, datos:[]})
    })
}
productosModel.ListarId             = function(post, callback){
    MyModel.find({_id:post._id},{}).then((respuesta) =>{
        return callback({state: true, datos:respuesta})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, error:error, datos:[]})
    })
}
productosModel.Actualizar           = function(post, callback){
    MyModel.findOneAndUpdate({_id:post._id},{
        nombre:post.nombre,
        color:post.color,
        precio:post.precio,
        descripcion:post.descripcion,
        unidades:post.unidades,
        imagen:post.imagen
    }).then((respuesta) => {
        return callback({state: true})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, error:error})
    })
}
productosModel.Eliminar             = function(post, callback){
    MyModel.findOneAndDelete({_id:post._id}).then((respuesta) => {
        console.log(respuesta)
        return callback({state: true})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, error:error})
    })
}


module.exports. productosModel =  productosModel