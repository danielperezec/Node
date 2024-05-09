require('dotenv').config();
var jwt = require('jsonwebtoken');
const Sessions = require("../models/accesstoken")

var middleware= {
  tokenVerify: function (req,res,next){

    const token =req.headers['x-proyecto-accesstoken'];

    if(token){

      jwt.verify(token, process.env.key, (err, decoded)=>{
        if(err){
          return res.status(401).send({
            status:401,
            message:"token no valido"
          })

        }else{
          
          req.decoded = decoded;
          
          Sessions.findOne({ user:req.decoded.usuario.email, key: token, active:true})
            .then(session => {
                
                if(!session){
                  return res.status(401).send({
                    status:401, 
                    message: "session no encontrada"
                  })
                }
                next();
            })
            .catch(error => {
                console.error(error);
                return res.status(500).send({
                    status: 500,
                    message: "error detectado",
                });
            });


        }
      })

    }else{
      return res.status(401).send({
        status:401,
        message:"Datos no validos"
      })
    }

  }
}

module.exports= middleware