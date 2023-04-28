import { createAction, props } from "@ngrx/store";
import { ICurrentUser } from "../share/interfaces/user";

const currentUserDomein = '[CurrentUser]';
export const login = createAction(`${currentUserDomein} Login`, props<{ currentUser: ICurrentUser}>());
export const logout = createAction(`${currentUserDomein} Logout`);
export const updateUser = createAction(`${currentUserDomein} UpdateUser`, props<{ currentUser: ICurrentUser}>());
export const becomeNanny = createAction(`${currentUserDomein} Become Nanny`);
export const deleteNanny = createAction(`${currentUserDomein} Delete Nanny`);


