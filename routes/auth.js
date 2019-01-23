const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken') 
const passport = require('passport')
const googleStrategy = require('passport-google-oauth20')

const db = require('../config/db')

const router = express.Router()

passport.use(new googleStrategy({
    clientID:process.env.googleClientID,
    clientSecret:process.env.googleClientSecret,
    callbackURL:process.env.googleCallbackURL
},function(accessToken,refreshToken,profile,done){
    console.log(profile)
    return done(null,'sukses')
}))

// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.send('You must login!');
    }
}

// passport.authenticate middleware is used here to authenticate the request
router.get('/auth/google', passport.authenticate('google',{
    scope: ['profile']
}))

// The middleware receives the data from Google and runs the function on Strategy config
router.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/secret');
})

// Secret route
router.get('/secret', isUserAuthenticated, (req, res) => {
    res.send('You have reached the secret route');
});

router.post('/daftar',(req,res,next)=>{

    let username = req.body.username
    let email = req.body.email
    let nomor_telpon = req.body.nomor_telpon
    let nama_lengkap = req.body.nama_lengkap
    let password = req.body.password

    let isUserAlreadyExist = db.models.user.findOne({where:{EMAIL:email}})
    
    isUserAlreadyExist.then(result=>{
        
        if(!result){

            bcrypt.hash(password,10,(err,hash)=>{
                
                if(err){
                    return res.status(500).json({ err })                    
                }                
                
                db.models.user.create({                    
                    NMLGKP:nama_lengkap,
                    NOMOHP:nomor_telpon,
                    EMAIL:email,
                    USERNM:username,
                    PASSWD:hash
                })
                .then(result=>{
                    
                    if(result){                        
                        const token = jwt.sign({ 
                            username:username,
                            password:password
                        },process.env.token_secret,{expiresIn:"1h"})

                        return res.status(200).json({
                            msg:`sukses! data user sudah ditambahkan`,
                            token
                        })
                    }
                    

                }).catch(err=>res.status(500).json({err}))
            })
        }else{
            return res.status(409).json({
                msg:'user sudah pernah ada sebelumnya'
            })
        }
    })
    .catch(err=>res.status(500).json({err}))

})

router.post('/login',(req,res,next)=>{
    
    let username = req.body.email
    let password = req.body.password
    let isUserExist = db.models.user.findOne({
        where:{ EMAIL:req.body.email }
    })

    isUserExist.then(result=>{
        
        if(!result){
            return res.status(401).json({
                msg:`user yang diminta tidak ada `
            })
        }

        // console.log(username);

        bcrypt.compare(req.body.password, result.dataValues.PASSWD, function(err,hashResult){
            
            if(err){
                return res.status(401).json({ msg: `autentikasi gagal` })
            }            
            
            if(hashResult){
                
                let token = jwt.sign({ 
                    username:result.dataValues.USERNM,
                    password:result.dataValues.PASSWD
                },process.env.token_secret,{expiresIn:"1h"})

                let user_data_returned = {
                    nmdpan:result.dataValues.NMDPAN,
                    nmblkg:result.dataValues.NMBLKG,
                    email:result.dataValues.EMAIL,

                }
                
                return res.status(200).json({                    
                    message:`success! you are login now`,
                    user:user_data_returned,
                    token
                })

                console.log(hashResult)
            }

            res.status(401).json({
    			message:"auth failed"
    		});
        })
    }).catch(err=>res.status(500).json({err}))
    
})

module.exports = router