const  jwt = require('jsonwebtoken');

function createAccessToken(data){
  if(data && process.env.JWT_ACCESS_EXPIRY && process.env.JWT_SECRET ){
    return jwt.sign(data, process.env.JWT_SECRET , { expiresIn: process.env.JWT_ACCESS_EXPIRY });
  }
  else{
    throw new Error('data ,Expiry time and secret madetory for JWT');
  }
}

module.exports= createAccessToken