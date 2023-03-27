import { IUser } from "./user";

export interface INanny {
    _id: string;
    user: string | IUser;
    firstName: string;
    lastName: string;
    description: string;
    workingTime: string;
    drivingLicence: string;
    gender: string;
    phone: string;
    image: string;
    likes: (string | IUser)[];
    comments: (string | IUser)[];
    created_at: string;
    __v: string;
}

