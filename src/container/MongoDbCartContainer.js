const mongoose = require("mongoose");
const config = require ('../config')
const logger = require('../loggers/loggersLog4js')

mongoose.set('strictQuery', false);
try {
    mongoose.connect(config.MONGO_STORE)
    logger.info('base de datos conectada')
} catch (error) {
    logger.error(error)
}

class MongoDbCartContainer {
    constructor(collectionName,schema){
        this.collection=mongoose.model(collectionName,schema)
    }
    async createCart(){
        try{
            let cart ={
                    id:(Math.random() + 1).toString(20).substring(3),
                    timestamp:new Date().toLocaleString(),
                    products:[]}
            const itemSave= await this.collection.create(cart)
            return itemSave.id}
        catch(error){
            throw new Error('error al actualizar')
        }
    }
    async deleteCart(cartId){
        try{
            const deleteProd=await this.collection.deleteOne({'_id':cartId})
            return deleteProd}
        catch(error){
            throw new Error('error al actualizar')
        }
    }
    async getById(cartId){
        try{
            const cart=await this.collection.find({'_id':cartId},{__v:0})
                return cart}
        catch(error){
            throw new Error('error al actualizar')
        }
        }
    async save(idProduct,idcart){
        try{
            const carrito =await this.getById(idcart)
            const prod=await this.collection('products','prod').find({'_id':idProduct},{__v:0})
            const saveInCart=carrito.products.push(prod)
            const save = await this.collection.updateOne({'_id':saveInCart._id},{'products':saveInCart})
            return save
            }
        catch(error){
            throw new Error('error al actualizar')
        }
    }
    async deleteById(idProduct,idcart) {
        try{
            const carrito = this.getById(idcart)
            const arrayFiltrado = carrito.products.filter(products => products.id !== idProduct);
            carrito=arrayFiltrado
            const deleted = await this.collection.updateOne({'_id':arrayFiltrado._id},{'products':arrayFiltrado})
            return deleted}
        catch(error){
            throw new Error('error al actualizar')
        }
    }
}

module.exports= MongoDbCartContainer