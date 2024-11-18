const mongoose = require("mongoose")
var categoriasModel = {}

var Schema = mongoose.Schema
var categoriasSchema = new Schema({
    codigo:String,
    nombre:String,
})

const MyModel = mongoose.model("categorias", categoriasSchema)

categoriasModel.VerificarCodigoUnico = function(post, callback){
    
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
categoriasModel.Guardar              = function(post, callback){
    const instancia = new MyModel
    instancia.nombre = post.nombre
    instancia.codigo = post.codigo
    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state:true, mensaje:"Producto guardado Correctamente"})
    }).catch((error) => {
        console.log(error)
        return callback({state:false, mensaje:"Ups error al almacenar"})
    })
}
categoriasModel.Listar               = function(post, callback){
    MyModel.find({},{}).then((respuesta) =>{
        return callback({state: true, datos:respuesta})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, error:error, datos:[]})
    })
}
categoriasModel.ListarId             = function(post, callback){
    MyModel.find({_id:post._id},{}).then((respuesta) =>{
        return callback({state: true, datos:respuesta})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, error:error, datos:[]})
    })
}
categoriasModel.Actualizar           = function(post, callback){
    MyModel.findOneAndUpdate({_id:post._id},{
        nombre:post.nombre,
    }).then((respuesta) => {
        return callback({state: true})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, error:error})
    })
}
categoriasModel.Eliminar             = function(post, callback){
    MyModel.findOneAndDelete({_id:post._id}).then((respuesta) => {
        console.log(respuesta)
        return callback({state: true})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, error:error})
    })
}


module.exports. categoriasModel =  categoriasModel