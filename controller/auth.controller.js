const userModel = require("../models/user.model")
const createAccessToken = require("../helper/createJWT")

const registerUser = async (req, res) => {
  try{
    const filename = req.file && req.file.filename || null;
    const result = await userModel.create_user(res.locals.inputdata , filename )
    res.status(200).send({ success: 1 , data: result });
  }
  catch(err){
    res.status(400).send({ success: 0 , message: err.message });
  }
  
};

const loginUser= async (req, res) => {
  try{
    const result = await userModel.getUserByemailandPassword(req.body)
    const {id, name } = result
    const JWTtoken = createAccessToken({id, name})
    res.status(200).send({ success: 1 , data: result , accesstoken : JWTtoken });
  }
  catch(err){
    res.status(400).send({ success: 0, message: err.message });
  }
  
};

module.exports = {
  registerUser,
  loginUser
};