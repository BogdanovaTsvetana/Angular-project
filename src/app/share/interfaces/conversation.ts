import { IMessage } from "./message";
import { IUser } from "./user";

export interface IConversation {
    _id: string;
    userName1: string;
    userName2: string;
    messages: IMessage[];
    __v: string;
}
