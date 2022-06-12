const { Schema, model } = require('mongoose');

const schema = new Schema({

    author: { type: String },
    message: { type: String },
    postDate: { type: Date },
    read: { type: Boolean, default: false },
});

module.exports = model('Message', schema);