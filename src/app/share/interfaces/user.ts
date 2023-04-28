import { IConversation } from "./conversation";
import { INanny } from "./nanny";

export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string,
    isNanny: boolean;
    nanny: string | INanny;
    memberSince: string;
    favourites: string[];
    conversations: IConversation[];
}

export interface ICurrentUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string,
    isNanny: boolean;
    nanny: string | INanny;
    memberSince: string;
    favourites: string[];
    conversations: IConversation[];
    accessToken: string,
}

 
