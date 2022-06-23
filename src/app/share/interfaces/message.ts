export interface IMessage {
    _id: string;
    authorFirstName: string;
    authorLastName: string;
    message: string;
    postDate: string;
    read: boolean;
    __v: string;
}

// authorFirstName: { type: String },
// authorLastName: { type: String },
//     message: { type: String },
//     postDate: { type: Date },
//     read: { type: Boolean, default: false },