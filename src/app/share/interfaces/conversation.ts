import { IMessage } from "./message";

export interface IConversation {
    _id: string;
    userName1: string;
    userName2: string;
    messages: IMessage[];
    __v: string;
}
