const { Schema, model} = require('mongoose');

const schema = new Schema({
    author: { 
      type: String, 
      required: [true, 'Name is required'], 
    },
    content: { type: String, required: true },
    postDate: { type: Date }
  });

module.exports =  model('Comment', schema);