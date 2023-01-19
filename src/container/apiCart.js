const fs = require('fs')

class Api{
    constructor(){
        this.carts=[];
    }
    createCart(){
        let cart ={
                id:(Math.random() + 1).toString(20).substring(3),
                timestamp:new Date().toLocaleString(),
                products:[]}
        this.carts.push(cart)
        return cart.id
    }
    deleteCart(cartId){
        const arrayFiltrado = this.carts.filter(cart => cart.id !== cartId);
        this.carts=arrayFiltrado
        return arrayFiltrado
    }
    getById(cartId){
        let resultCart=this.carts.find(cart => cart.id===cartId)   
        let productsInCart=resultCart.products
        console.log(productsInCart)
            return productsInCart
        }
    async save(idProduct,idcart){
        try{
            const carrito = this.getById(idcart)
            const productRead =await fs.promises.readFile('productos.txt','utf-8')
            const productToObj = JSON.parse(productRead)
            const productArray=productToObj.filter(product=>product.id !== idProduct)
            carrito.products.push(productArray)}
        catch(error){
            console.log('error de lectura')
        }
    }
    deleteById(idProduct,idcart) {
        const carrito = this.getById(idcart)
        const arrayFiltrado = carrito.products.filter(products => products.id !== idProduct);
        return carrito=arrayFiltrado
    }

}

module.exports=Api