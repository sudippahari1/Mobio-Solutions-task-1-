const router                =   require("express").Router()
const JoiAuthMiddleware     =   require('../middleware/joi')
const Controller            =   require('../controller')
const multerUpload          =   require('../middleware/fileupload');


router.post('/registration', 
  multerUpload.single('image'), 
  JoiAuthMiddleware.validateRegistrationInputData,
  Controller.authController.registerUser
);

router.post('/login', 
  JoiAuthMiddleware.validateLoginInputData,
  Controller.authController.loginUser
);


module.exports=router;