// const express = require('express')
// const routerLog=require('./routes/logRoutes')
// const routerNumbers=require('./container/randomNum')
// const {engine} = require('express-handlebars')
// const logger = require('./loggers/loggersLog4js')
// const parseArgs = require('minimist')
// const sendMail=require('./sendNotifications/sendEmail')
// const {newUserEmail,newUserBuy}=require('./sendNotifications/emailTemplates')


// const app = express()

// // app.use(express.static('public'));
// app.use('/',routerLog)
// app.use('/',routerNumbers)

// app.engine("handlebars",engine())
// app.set("view engine","handlebars")
// app.set("views","./views")

// const data1={
//     mail:'asasasa',
//     pass:'pepepep',
//     nombre:'sdsdsds',
//     direccion:'daseerre',
//     edad:'kkerkekre',
//     imagen:'jjejrjerje'
// }
// const data2={
//     nombre:'jejejejeje',
//     mail:'jejhhdshdhsdhsd',
//     prods:[{p:'asasa',c:'sasa'},{p:'asasa',c:'sasa'},{p:'asasa',c:'sasa'},{p:'asasa',c:'sasa'},{p:'asasa',c:'sasa'}]
// }
// const newuser=newUserEmail(data1)
// const newbuy=newUserBuy(data2)
// sendMail('nuevo usuario',newuser)
// sendMail('nuevo compra',newbuy)
// const options ={
//     alias: {
//         'p':'PORT'
//     },
//     default: {
//         'PORT': 8080
//     }
// }
// const {PORT} = parseArgs(process.argv.slice(2), options)

// const server = app.listen(PORT, () => { 
//     logger.info(`Servidor Http con Websockets escuchando en el puerto ${server.address().port}`);
// })
// server.on('error', error => logger.error(`Error en servidor ${error}`))