import { createReducer, on } from "@ngrx/store";
import { ICurrentUser } from "../share/interfaces/user";
import { login, logout, switchToNanny, switchToParent } from "./actions";

export interface IrootState {
    currentUser: ICurrentUser,
}

export const currentUserReducer = createReducer<ICurrentUser>(
    undefined,
    on(login, (_, action) => action.currentUser),
    on(logout, () => undefined),
    on(switchToNanny, (state, action) => {
        return {
            ...state,
            userType: 'nanny'
        }
    }),
    on(switchToParent, (state, action) => {
        return {
            ...state,
            userType: 'parent'
        }
    }),
)
 

