const  jwt = require('jsonwebtoken');

JWTmiddleware = (req, res, next ) => {

    try{
        const token = (req.header && req.header('Authorization') ) ? req.header('Authorization') : null ;
        if(token){
            const tokenstring = token.split(" ")[1];
            const JwtData = jwt.verify(tokenstring, process.env.JWT_SECRET); 
            res.locals.user = JwtData;
            next();
        }
        else{
            return res.status(401).send({ status: 'Auth failed', time: new Date().getTime() });
        } 
    }
    catch(err) {
        console.log(err)
        return res.status(401).send({ status: 'Auth failed'});
    }
};

module.exports = JWTmiddleware