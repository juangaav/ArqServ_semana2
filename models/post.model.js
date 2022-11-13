const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  id: {
    type: String,
    maxlength: 300
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  },
  title: {
    type: String,
    required: 'title is required',
    minLength: 5
  },
  text: {
    type: String,
    required: 'text is required',
    minLength: 5
  },
  author: {
    type: String,
    required: 'author is required',
    maxlength: 300
  }
}, { 
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret.__v;
      delete ret._id;
      return ret;
    }
  }
});

const Post = mongoose.model('Post', schema);

module.exports = Post;
