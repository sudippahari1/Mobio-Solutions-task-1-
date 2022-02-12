const userModel = require("../models/user.model")
const checkUpcomingBirthDay = require("../helper/checkBirthDate")

const getUserProfile = async (req, res) => {
  try{
    const result = await userModel.findUserbyId(res.locals.user)
    const upcoming_birthday = checkUpcomingBirthDay(result)
    res.status(200).send({ success: 1 , user: result , upcoming_birthday: upcoming_birthday });
  }
  catch(err){
    res.status(400).send({ success: 0 , message: err.message });
  }
  
};


module.exports = {
  getUserProfile
};