export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string,
    password: string;
    userType: string;
    nanny: object | string;
    memberSince: string;
    inbox: string;
    favourites: string[];
    conversations: string[];
    __v: string;

}

 
