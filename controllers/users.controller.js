const createError = require('http-errors');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports.create = (req, res, next) => {
  const data = { name, email, password, bio, active  } = req.body

  User.create({
    ...req.body,
    valid: false,
  })
    .then(user => res.status(201).json(user))
    .catch(next)
}

module.exports.validate = (req, res, next) => {
  User.findByIdAndUpdate(
    req.params.id, 
    {valid: true, active:true}, 
      { 
        new: true,
        runValidators: true
      }
  )
.then((user) => {
    if(user) {
        res.json(user);
    }else{
        return next(createError(404, "User not found."));
    }
  })
  .catch(next);
};

module.exports.login = (req, res, next) => {
  const {username, password} = req.body;

  User.findOne({ username })
   .then((user) => {
      if(user) {
        user.checkPassword(password).then((match) => {
          if(match) {
            if(user.active){
              const token = jwt.sign(
                { sub: user.id, exp: Date.now() / 1000 + 3600},
                "random salt"
              );
              res.json({token});
            }else{
              next(createError(401, "User Inactive"));
            }
          } else {
            next(createError(401, "unauthorized"));
          }
        });
      } else {
        next(createError(404, "User not found"));
      }
   })
   .catch(next);
};


