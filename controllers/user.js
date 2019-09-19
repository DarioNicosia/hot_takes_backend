const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.signup =(req,res,next)=>{
    bcrypt.hash(req.body.password, 10).then(
        (hash)=>{
            const user = new User ({
                email:req.body.email,
                password:hash
            });
           user.save().then(
            ()=>{
                req.status(201).json({
                    message:'user added succesfully'
                })
            }   
           ).catch(
               (error)=>{
                   req.status(500).json({
                       error:error
                   });
               }
           ); 
        }
    );
};

exports.login =(req,re,next)=>{


    
}