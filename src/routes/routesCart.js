const express = require('express')
const {Router}= require('express')
const routerCart= new Router()
const Api = require('../container/apiCart')
const apiCart = new Api()


routerCart.use(express.json())
routerCart.use(express.urlencoded({ extended: true }))

routerCart.get('/',(req,res)=>{
    apiCart.createCart()
    res.render('carrito')
})

// routerCart.post('/',(req,res)=>{
//     let carritoCreado = JSON.stringify(apiCart.createCart())
//     res.json(`carrito creado con exito, su id es : ${carritoCreado}`)
// })

routerCart.delete('/:id',(req,res)=>{
    let id = parseInt(req.params.id)
    let cartDeleted =JSON.stringify(apiCart.deleteCart(id))
    if (cartDeleted){
        res.json(`Se elimino correctamente el carrito`)}
    else{
        res.status(404).send({ error: "Product not found" })
    }
})

routerCart.get('/:id/productos',(req,res)=>{
    let selectedCart = JSON.stringify(apiCart.getById(req.params.id))
    if (selectedCart){
            res.json(`Su carrito contiene los siguientes productos : ${selectedCart}`)}
    else{
        res.status(404).send({ error: "Product not found" })
    }
})

routerCart.post('/:id/productos/:id_prod',(req,res)=>{
    let {id,id_prod} = parseInt(req.params)
    apiCart.save(id,id_prod)
    let productSaved = JSON.stringify(id,id_prod)
    res.json(`Se agrego el producto : ${productSaved}`)
})

routerCart.delete('/:id/productos/:id_prod',(req,res)=>{
    let {id,id_prod} = parseInt(req.params)
    let productDeleted =JSON.stringify(apiCart.deleteById(id,id_prod))
    if (productDeleted){
        res.json(`Se elimino correctamente el producto ${productDeleted}`)}
    else{
        res.status(404).send({ error: "Product not found" })
    }
})


module.exports=routerCart