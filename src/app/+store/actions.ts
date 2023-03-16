import { createAction, props } from "@ngrx/store";
import { ICurrentUser } from "../share/interfaces/user";

const currentUserDomein = '[CurrentUser]';
export const login = createAction(`${currentUserDomein} Login`, props<{ currentUser: ICurrentUser}>());
export const logout = createAction(`${currentUserDomein} Logout`);

