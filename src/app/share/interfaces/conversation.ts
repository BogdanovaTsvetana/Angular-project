import { IMessage } from "./message";
import { IUser } from "./user";

export interface IConversation {
    _id: string;
    user1: IUser;
    user2: IUser;
    messages: IMessage[];
    __v: string;
}
