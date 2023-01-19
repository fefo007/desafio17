const twilio = require('twilio')
const logger = require('../loggers/loggersLog4js')
const config = require('../config')

const accountSid = config.TWILIO_SID
const authToken = config.TWILIO_TOKEN

const twilioClient = twilio(accountSid,authToken)


const sendWP = async (to,from,body,mediaUrl) => {
    try{
    const info = await twilioClient.messages.create({mediaUrl,body,from,to})
    logger.info('sms enviado con exito')
    return info
    } catch (error) {
        logger.error(error)
    }
}

module.exports = sendWP