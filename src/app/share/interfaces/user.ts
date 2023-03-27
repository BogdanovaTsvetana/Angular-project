import { IConversation } from "./conversation";

export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string,
    password: string;
    userType: string;
    nanny: string | IUser;
    memberSince: string;
    inbox: string;
    favourites: string[];
    conversations: IConversation[];
    __v: string;
}

export interface ICurrentUser {
    _id: string,
    firstName: string;
    lastName: string;
    email: string,
    isNanny: boolean;
    accessToken: string,
}

 
