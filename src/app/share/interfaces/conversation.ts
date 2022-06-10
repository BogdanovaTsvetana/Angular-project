export interface Conversation {
    _id: string;
    user1: string | object;
    user2: string | object;
    //subject: string ,
    messages: object[];
    __v: string;
}


//  user1: { type: Schema.Types.ObjectId, ref: 'User'},
//  user2: { type: Schema.Types.ObjectId, ref: 'User'},
//  subject: { type: String },
//  messages: [{ type: Schema.Types.ObjectId, ref: 'Message', default: [] }],

// export interface INanny {
//     _id: string;
//     name: string;
//     description: string;
//     workingTime: string;
//     drivingLicence: string;
//     gender: string;
//     phone: string;
//     image: string;
//     user: object | string;

//     postDate: string;
//     likes: string[];
//     comments: any[];
//     __v: string;
// }