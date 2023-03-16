import { createReducer, on } from "@ngrx/store";
import { ICurrentUser } from "../share/interfaces/user";
import { login, logout } from "./actions";

export interface IrootState {
    currentUser: ICurrentUser,
}

export const currentUserReducer = createReducer<ICurrentUser>(
    undefined,
    on(login, (_, action) => action.currentUser),
    on(logout, () => undefined)
)
 