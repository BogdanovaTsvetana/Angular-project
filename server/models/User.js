const { Schema, model} = require('mongoose');

const schema = new Schema({
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    email: { type: String },
    hashedPassword: { type: String , required: true},
    userType: { type: String, default: 'parent' },
    //location: { type: String },

    memberSince: { type: Date },
    inbox: {type: Number, default: 0 },
    //itemsForSale: [{ type: Schema.Types.ObjectId, ref: 'Item', default: [] }],
    //soldItems: [{ type: Schema.Types.ObjectId, ref: 'Item', default: [] }],
    nanny: { type: Schema.Types.ObjectId, ref: 'Item' },
    favourites: [{ type: Schema.Types.ObjectId, ref: 'Item', default: [] }],
    conversations: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    //followers: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
});

module.exports = model('User', schema);

    // username: string,
    // email: string,
    // hashedPassword: string,
    // memberSince: string,
    // inbox: number,
    // nanny: object,
    // favourites: object[],
    // conversations: [],