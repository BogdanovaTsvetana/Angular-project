const { Schema, model } = require('mongoose');

const schema = new Schema({
    userName1: { type: String },
    userName2: { type: String },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message', default: [] }],
});

module.exports = model('Conversation', schema);


