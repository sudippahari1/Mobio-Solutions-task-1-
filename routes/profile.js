const router                =   require("express").Router()
const JWTmiddleware         =   require('../middleware/jwt')
const Controller            =   require('../controller')

router.get('/', 
  JWTmiddleware,
  Controller.profileController.getUserProfile
);


module.exports=router;