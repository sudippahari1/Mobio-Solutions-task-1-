const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10


function convertDbFields(data) {
  const jsObject = JSON.parse(JSON.stringify(data))
  jsObject.id = jsObject._id
  delete jsObject._id;
  delete jsObject.password;
  delete jsObject.__v;
  return jsObject;
}



const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  dob: {
    type: Date,
    required: true,
  },

  prifile_pic: {
    type: String,
  },

});


const User = mongoose.model('User', userSchema);


async function create_user(userData , image){
  try{
    const findData = await User.findOne({email:userData.email}).exec()
    if (findData) {
      throw new Error('user already exists');
    }
    else{
      const salt = bcrypt.genSaltSync(saltRounds);
      userData.password = bcrypt.hashSync(userData.password, salt);
      const usrObj = new User({...userData, prifile_pic:image} );
      const dbSavedData =  await usrObj.save()   
      return convertDbFields(dbSavedData)
    }
  }
  catch(err){
    if(err.message) throw new Error(err.message);
    throw new Error('User not created');
  }
}

async function getUserByemailandPassword ({email,password}){
  try{  
    const DbUserData = await User.findOne({email:email}).exec()
    
    if(DbUserData){
      const status = bcrypt.compareSync(password, DbUserData.password)  
      if(status) {
        return convertDbFields(DbUserData)
      }
      else{
        throw new Error('credentials invalid');
      }        
    }
    else{
      throw new Error('credentials invalid');
    }
  }
  catch(err){
    if(err.message) throw new Error(err.message);
    throw new Error('User not created');
  }
}

async function findUserbyId ({id}){
  try{  
    const DbUserData = await User.findOne({_id:id}).exec()
    
    if(DbUserData){
      return convertDbFields(DbUserData)
    }
    else{
      throw new Error('User not found');
    }
  }
  catch(err){
    if(err.message) throw new Error(err.message);
    throw new Error('User not found');
  }
}


module.exports = { create_user , getUserByemailandPassword , findUserbyId};