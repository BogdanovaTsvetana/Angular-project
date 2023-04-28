const { Schema, model } = require('mongoose');

// const schema = new Schema({
//     user1: { type: Schema.Types.ObjectId, ref: 'User'},
//     user2: { type: Schema.Types.ObjectId, ref: 'User'},
//     messages: [{ type: Schema.Types.ObjectId, ref: 'Message', default: [] }],
// });

const schema = new Schema({
    userName1: { type: String },
    userName2: { type: String },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message', default: [] }],
});

module.exports = model('Conversation', schema)


