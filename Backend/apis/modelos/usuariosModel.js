const mongoose = require("mongoose")
var usuariosModel = {}

var Schema = mongoose.Schema
var usuariosSchema = new Schema({
    nombre:String,
    email:String,
    password:String,
})

const MyModel = mongoose.model("usuarios", usuariosSchema)
usuariosModel.Guardar       = function(post, callback){
    const instancia = new MyModel
    instancia.nombre = post.nombre
    instancia.email = post.email
    instancia.password = post.password

    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state:true, mensaje:"Usuario Guardado Correctamente"})
    }).catch((error) => {
        console.log(error)
        return callback({state:false, mensaje:"Ups error al almacenar"})
    })
}

usuariosModel.Listar        = function(post, callback){
    MyModel.find({},{password:0,__v:0}).then((respuesta) =>{
        return callback({state: true, datos:respuesta})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, error:error, datos:[]})
    })
}

usuariosModel.ListarId      = function(post, callback){
    MyModel.find({_id:post._id},{password:0,__v:0}).then((respuesta) =>{
        return callback({state: true, datos:respuesta})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, error:error, datos:[]})
    })
}
usuariosModel.Actualizar    = function(post, callback){
    MyModel.findOneAndUpdate({_id:post._id},{
        nombre:post.nombre
    }).then((respuesta) => {
        console.log(respuesta)
        return callback({state: true})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, error:error})
    })
}

usuariosModel.Eliminar      = function(post, callback){
    MyModel.findOneAndDelete({_id:post._id}).then((respuesta) => {
        console.log(respuesta)
        return callback({state: true})
    }).catch((error) => {
        console.log(error)
        return callback({state: false, error:error})
    })
}

usuariosModel.Login         = function(post, callback){
    MyModel.find({email:post.email, password:post.password},{}).then((respuesta) => {
        if(respuesta.length == 1){
            console.log(respuesta)
            return callback({state:true, mensaje: "Bienvenido: " + respuesta[0].nombre})
        }
        else{
            return callback({state: false, mensaje: "Credenciales inválidas, verifique que su cuenta esté activa"})
        }

    }).catch((error) => {
        console.log(error)
        return callback({state: false, error:error})
    })
}
module.exports.usuariosModel = usuariosModel