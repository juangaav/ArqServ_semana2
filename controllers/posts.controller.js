const Post = require('../models/post.model');
const createError = require('http-errors');

module.exports.create = (req, res, next) => {
    const data = { text } = req.body; 

    Post.create({
        ...data
    })
    .then(post => res.status(201).json(post))
    .catch(next)
};

module.exports.list = (req, res, next) => {
    Post.find()
        .then(posts => {
            res.json(posts);
        })
        .catch(next);
};

module.exports.detail = (req, res, next) => {
    Post.findById(req.params.id)
      .then(post => {
        if(post) {
            res.json(post);
        }
      })
      .catch(next);
};

module.exports.update = (req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, req.body, { 
        new: true,
        runValidators: true
    })
    .then(post => {
        if(post) {
            res.json(post);
        }
      })
      .catch(next);
};

module.exports.delete = (req, res, next) => {
    Post.findByIdAndDelete(req.params.id)
    .then((post) => {
        res.status(204).send();
    })
    .catch(next);
};