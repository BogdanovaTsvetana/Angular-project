const { Schema, model} = require('mongoose');

const schema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String },
    hashedPassword: { type: String , required: true},
    // userType: { type: String, default: 'parent' },
    isNanny: { type: Boolean, default: false },
    // memberSince: { type: Date },
    // inbox: {type: Number, default: 0 },
    nanny: { type: Schema.Types.ObjectId, ref: 'Item' },
    // favourites: [{ type: Schema.Types.ObjectId, ref: 'Item', default: [] }],
    conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation', default: [] }],
});

module.exports = model('User', schema);