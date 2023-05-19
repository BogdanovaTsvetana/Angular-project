const { Schema, model} = require('mongoose');

const schema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String },
    hashedPassword: { type: String , required: true},
    isNanny: { type: Boolean, default: false },
    memberSince: { type: Date },
    nanny: { type: Schema.Types.ObjectId, ref: 'Item' },
    favourites: [{ type: Schema.Types.ObjectId, ref: 'Item', default: [] }],
    conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation', default: [] }],
});

module.exports = model('User', schema);