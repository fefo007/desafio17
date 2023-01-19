const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username:{type:String,required:true},
        password:{type:String,required:true},
        direccion:{type:String,required:true},
        residencia:{type:String,required:true},
        edad:{type:Number,required:true},
        celular:{type:Number,required:true},
        formfile:{type:String,required:true},
    }
)

const cartSchema = new mongoose.Schema(
    {
        id:{type:Number,required:true},
        timestamp:{trype:Number},
        products:{type:[],required:true}
    }
)

const producSchema = new mongoose.Schema(
    {
        name:{type:String,required:true},
        price:{type:Number,required:true},
        description:{type:String,required:true},
        code:{type:Number,required:true},
        url:{type:String,required:true},
        stock:{type:Number,required:true},
    }
)

module.exports={userSchema,cartSchema,producSchema}