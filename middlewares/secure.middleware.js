const createError = require("http-errors");
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports.auth = (req, res, next) => {
    const authorization = req.headers.authorization;

    if(!authorization) {
        return next(createError(401, "Unauthorized: missing auth header."));
    }

    const token = authorization.split("Bearer ")[1];

    const decoded = jwt.verify(token, "random salt")

    User.findById(decoded.sub)
        .then((user) => {
            if(user) {
                req.user = user;
                next();
            }else{
                next(createError(401, "Unauthorized: invalid user."));
            }
        })
};