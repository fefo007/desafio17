const express =require('express')
const {Router}=require( 'express')
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const session = require('express-session')
const MongoStore = require('connect-mongo')
const config=require('../config')
const info = require('../container/info')
const compression = require('compression')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const logger = require('../loggers/loggersLog4js')
const bCrypt = require('bcrypt')
const sendMail=require('../sendNotifications/sendEmail')
const {newUserEmail}=require('../sendNotifications/emailTemplates')
const MongoDbUserContainer = require('../container/MongoDbUserContainer')
const userSchema = require('../mongoSchemas/mongoSchemas')
const mongoDbUserContainer = new MongoDbUserContainer('usuarios',userSchema)

const routerLog=new Router()


// ------------------------DATABASE--------------------------
const usuarios=[]

routerLog.use(session({
    store: MongoStore.create({
        mongoUrl:config.MONGO_STORE,
        mongoOptions: advancedOptions
    }),
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie:{maxAge:100000}
}))
// ------------------------/DATABASE--------------------------
// -------------------------PASSPORT---------------------------
passport.use('register', new LocalStrategy({passReqToCallback: true}, (req, username, password, done) => {

    const { direccion,residencia,edad,celular,formfile } = req.body
    const usuario = usuarios.find(usuario => usuario.username == username)
    // BASE DE DATOS--------- 
    // const usuario = mongoDbUserContainer.getUser(username)

    if (usuario) {
    return done('usuario ya existente')
    }

    const user = {
        username:username,
        password:bCrypt.hashSync(password,bCrypt.genSaltSync(10),null),
        direccion:direccion,
        residencia:residencia,
        edad:edad,
        celular:celular,
        formfile:formfile,
    }
    usuarios.push(user)
    const newuser=newUserEmail(user)
    sendMail('nuevo usuario',newuser)
    // BASE DE DATOS--------- 
    // mongoDbUserContainer.saveUser(user)

    return done(null, user)
}));

function isValidPass(user,password){
    return bCrypt.compareSync(password,user.password)
}

passport.use('login', new LocalStrategy((username, password, done) => {

    const user = usuarios.find(usuario => usuario.username == username)
    // BASE DE DATOS--------- 
    // const user = mongoDbUserContainer.getUser(username)
    if (!user) {
        return done(null, false)
    }

    if (!isValidPass(user,password)) {
        return done(null, false)
    }

    user.contador = 0
    return done(null, user);
}));

passport.serializeUser(function (user, done) {
    done(null, user.username);
});

passport.deserializeUser(function (username, done) {
    const usuario = usuarios.find(usuario => usuario.username == username)
    // BASE DE DATOS--------- 
    // const usuario = mongoDbUserContainer.getUser(username)
    done(null, usuario);
});
// -------------------------/PASSPORT---------------------------


routerLog.use(passport.initialize());
routerLog.use(passport.session());

routerLog.use(express.json())
routerLog.use(express.urlencoded({ extended: true }))


routerLog.get('/',(req,res)=>{
    if (req.isAuthenticated()) {
        res.redirect('/user/home')
    } else {
        res.redirect("/user/login");
    }
})
routerLog.get('/register',(req,res)=>{
    res.render('register')
})

routerLog.post('/register', passport.authenticate('register', { failureRedirect: '/user/registerError', successRedirect: '/user/login' }))

routerLog.get('/registerError',(req,res)=>{0
    logger.error('error de registro')
    res.render('registerError')
})
routerLog.get('/home',(req,res)=>{
    let user =usuarios.find(usuario => usuario.username == req.user.username)
        // BASE DE DATOS--------- 
        // const user = mongoDbUserContainer.getUser(username)
    res.render('userHome',{user})
})

routerLog.get('/info',(req,res)=>{
    let user =usuarios.find(usuario => usuario.username == req.user.username)
        // BASE DE DATOS--------- 
        // const user = mongoDbUserContainer.getUser(username)
    res.render('userInfo',{user})
})


routerLog.get('/login',(req,res)=>{
    res.render('index')
})
routerLog.post('/login', passport.authenticate('login', { failureRedirect: '/user/loginError', successRedirect: '/user/home' }))

routerLog.get('/loginError',(req,res)=>{
    logger.error('error de logeo')
    res.render('loginError')
})
routerLog.get("/logout", (req, res,next) => {
    req.logout(req.user, err => {
        if(err) return next(err);
        res.redirect("/user/login");
    });
});

// COMPRIMIR LA RUTA INFO
routerLog.get('/sistemInfo',compression(),(req,res)=>{
    let inf = info
    res.render('info',inf)
})
// SIN COMPRIMIR
// routerLog.get('/info',(req,res)=>{
//     let inf = info
//     res.render('info',inf)
// })


module.exports=routerLog