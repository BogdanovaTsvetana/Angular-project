const { Schema, model} = require('mongoose');

const schema = new Schema({
    //author: { type: Schema.Types.ObjectId, ref: 'User' },
    author: { 
      type: String, 
      required: [true, 'Name is required'], 
    },
    content: { type: String, required: true },
    postDate: { type: Date }
  });

module.exports =  model('Comment', schema);