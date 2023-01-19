const express = require('express')
const {Router}= require('express')
const routerProd = new Router()
const Api = require('../container/apiProd')
const apiProd = new Api()

routerProd.use(express.json())
routerProd.use(express.urlencoded({ extended: true }))

routerProd.get('/',(req,res)=>{
    res.render('productos')
})
routerProd.get('/cargarProductos',(req,res)=>{
    let completeList=apiProd.getAll()
    // let user = usuarios.find(usuario => usuario.username == req.user.username)
        // BASE DE DATOS--------- 
    // const user = mongoDbUserContainer.getUser(username)
    res.render("form",{completeList})
})
routerProd.post('/cargarProductos',(req,res)=>{
    apiProd.save(req.body)
    res.redirect('/productos/cargarProductos')
})

module.exports=routerProd