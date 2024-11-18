var usuariosController = require("./apis/controladores/usuariosController.js").usuariosController

app.post("/usuarios/guardar", function(requests,response){
    usuariosController.Guardar(requests,response)
})

app.post("/usuarios/listar", function(requests,response){
    usuariosController.Listar(requests,response)
})

app.post("/usuarios/listarid", function(requests,response){
    usuariosController.ListarId(requests,response)
})

app.post("/usuarios/actualizar", function(requests,response){
    usuariosController.Actualizar(requests,response)
})

app.post("/usuarios/eliminar", function(requests,response){
    usuariosController.Eliminar(requests,response)
})

app.post("/usuarios/login", function(requests,response){
    usuariosController.Login(requests,response)
})

app.post("/usuarios/activarCuenta", function(requests,response){
    usuariosController.ActivarCuenta(requests,response)
})

app.post("/usuarios/actualizarPass", function(requests,response){
    usuariosController.ActualizarPass(requests,response)
})


var productosController = require("./apis/controladores/productosController.js").productosController

app.post("/productos/guardar", function(requests,response){
    productosController.Guardar(requests,response)
})

app.post("/productos/listar", function(requests,response){
    productosController.Listar(requests,response)
})
app.post("/productos/listarid", function(requests,response){
    productosController.ListarId(requests,response)
})

app.post("/productos/actualizar", function(requests,response){
    productosController.Actualizar(requests,response)
})

app.post("/productos/eliminar", function(requests,response){
    productosController.Eliminar(requests,response)
})

var categoriasController = require("./apis/controladores/categoriasController.js").categoriasController

app.post("/categorias/guardar", function(requests,response){
    categoriasController.Guardar(requests,response)
})

app.post("/categorias/listar", function(requests,response){
    categoriasController.Listar(requests,response)
})
app.post("/categorias/listarid", function(requests,response){
    categoriasController.ListarId(requests,response)
})

app.post("/categorias/actualizar", function(requests,response){
    categoriasController.Actualizar(requests,response)
})

app.post("/categorias/eliminar", function(requests,response){
    categoriasController.Eliminar(requests,response)
})

var elementosController = require("./apis/controladores/elementosController.js").elementosController

app.post("/elementos/guardar", function(requests,response){
    elementosController.Guardar(requests,response)
})

app.post("/elementos/listar", function(requests,response){
    elementosController.Listar(requests,response)
})

app.post("/elementos/filtro", function(requests,response){
    elementosController.Filtro(requests,response)
})

app.post("/elementos/listarid", function(requests,response){
    elementosController.ListarId(requests,response)
})

app.post("/elementos/actualizar", function(requests,response){
    elementosController.Actualizar(requests,response)
})

app.post("/elementos/eliminar", function(requests,response){
    elementosController.Eliminar(requests,response)
})