const { Schema, model} = require('mongoose');

const URL_PATTERN = /^https?:\/\//;

const schema = new Schema({
    // name: { 
    //     type: String, 
    //     required: [true, 'Name is required'], 
    // },
    firstName: { 
        type: String, 
        required: [true, 'First name is required'], 
    },
    lastName: { 
        type: String, 
        required: [true, 'Last name is required'], 
    },
    //years: { type: Number },
    workingTime: { type: String },
    description: { type: String },
    drivingLicence: { type: String },
    gender: {type: String},
    image: { type: String, match: [URL_PATTERN, 'Image must be a valid URL'] },
    phone: { type: String, default: ''},
    created_at: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: 'User' },  // TODO
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }],
    likes: [{type: Schema.Types.ObjectId, ref: 'User', default: [] }],
});

module.exports = model('Item', schema);

