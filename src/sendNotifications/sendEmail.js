const nodemailer = require("nodemailer")
const logger = require('../loggers/loggersLog4js')
const config=require('../config')

const emailConfig = {
    service:"gmail",
    port:587,
    auth:{
        user:config.GMAIL_ACCOUNT,
        pass:config.GMAIL_PASS
    }
}

const transporter = nodemailer.createTransport(emailConfig)

const options =(asunto,msjhtml)=>{return {
    to:process.env.GMAIL_ACCOUNT,
    subject:asunto,
    html:msjhtml
}}

const sendMail = async (asunto,msjhtml)=>{
    try {
        const mailOptions = options(asunto,msjhtml);
        await transporter.sendMail(mailOptions)
        logger.info('email enviado...')
    } catch (error) {
        logger.error(error)
    }
}

module.exports=sendMail