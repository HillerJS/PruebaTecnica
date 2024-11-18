const express = require("express")
global.app = express()
global.config = require("./config.js").config
const mongoose = require("mongoose")
var cors = require("cors")
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
global.SHA256 = require('sha256')

mongoose.connect("mongodb://127.0.0.1:27017/" + config.bd).then((respuesta)=>{
    console.log("Conexión correcta a mongo")
}).catch((error)=> {
    console.log(error)
});

app.use(cors({
    origin:function(origin, callback){
        console.log(origin)
        if(!origin) return callback(null, true)
        if(config.origins.indexOf(origin) === -1){
            console.log('error')
            return callback('error de cors', false)
        }
        return callback(null, true)
    }
}));
require("./rutas.js")
app.listen(config.puerto , function(){
    console.log("servidor funcionando por el puerto " + config.puerto)
})
