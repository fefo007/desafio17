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

class MongoDbProdContainer {
    constructor(collectionName,schema){
        this.collection=mongoose.model(collectionName,schema)
    }
    async getAll(){
        try {
            const files = []
            let file = await this.collection.find({},{__v:0})
            file.forEach(doc=>{
                files.push({id: doc.id,...doc.data()})
            })
            return files
        }
        catch(err){
            console.log('no se pudo cargar el archivo')
        }
    }
    async getById(idProduct){
        try{
            let file = await this.collection.find({'_id':idProduct},{__v:0})
            return file
        }
        catch(err){
            console.log('no se pudo cargar el archivo')
        }
    }
    async save(product){
        try{
            const itemSave= await this.collection.create(product)
            return {...itemSave,id:itemSave._id}}
        catch (error){
            console.log('error de escritura')
        }
    }
    async  updateById(newProduct){
        try{
            const updateProd=await this.collection.replaceOne({'_id':newProduct._id},newProduct)
            return updateProd}
        catch(error){
            throw new Error('error al actualizar')
        }
    }
    async deleteById(idProduct) {
        try{
            const deleteProd=await this.collection.deleteOne({'_id':idProduct})
            return deleteProd}
        catch(error){
            throw new Error('error al actualizar')
        }
    }
}

module.exports= MongoDbProdContainer