export interface IUser {
    _id: string,
    username: string;
    email: string,
    password: string;
    userType: string;
    nanny: object | string;
    memberSince: string,
    inbox: string,
    favourites: string[],
    conversations: string[],
    __v: string;

}

 
