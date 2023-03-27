import { createAction, props } from "@ngrx/store";
import { ICurrentUser } from "../share/interfaces/user";

const currentUserDomein = '[CurrentUser]';
export const login = createAction(`${currentUserDomein} Login`, props<{ currentUser: ICurrentUser}>());
export const logout = createAction(`${currentUserDomein} Logout`);
export const isNanny = createAction(`${currentUserDomein} Is Nanny`);
export const switchToParent = createAction(`${currentUserDomein} Switch To Parent`);
// export const switchToNanny = createAction(`${currentUserDomein} Switch To Nanny`);
// export const switchToParent = createAction(`${currentUserDomein} Switch To Parent`);

