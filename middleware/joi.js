const Joi = require('joi'); 


const JoiAuthMiddleware = {
  // registration input validation
  validateRegistrationInputData : (req, res, next) => {
    const userInput = Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email({ tlds: false, minDomainSegments: 1 }).required(),
      password: Joi.string().min(6).required(),
      dob: Joi.date().required(),
    });

    const { value, error } = userInput.validate(req.body);
    if (error) {
      return res.status(400).send({message: error});
    }
    res.locals.inputdata = value;
    return next();
  },

  validateLoginInputData : (req, res, next) => {
    
    const loginInput = Joi.object().keys({
      email: Joi.string().email({ tlds: false, minDomainSegments: 1 }).required(),
      password: Joi.string().min(6).required(),
    });

    const { value, error } = loginInput.validate(req.body);
    if (error) {
      return res.status(400).send({message: error});
    }
    return next();
  },

}

module.exports = JoiAuthMiddleware
