require('dotenv').config({path:'../.env'})

module.exports={
    MONGO_STORE: process.env.MONGO_STORE || 'mongodb+srv://fracaroFederico:fracaroFederico@cluster0.vdsnjxs.mongodb.net/ecommerce?retryWrites=true&w=majority',
    SESSION_SECRET: process.env.SESSION_SECRET || 'shhhhhhhhhhhhhhhhhhhhh',
    GMAIL_ACCOUNT:process.env.GMAIL_ACCOUNT,
    GMAIL_PASS:process.env.GMAIL_PASS,
    TWILIO_SID:process.env.TWILIO_SID,
    TWILIO_TOKEN:process.env.TWILIO_TOKEN

}