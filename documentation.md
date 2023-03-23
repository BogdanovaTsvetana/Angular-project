Project "Sofia Nannies" 

* To run server cd server folder and node index.js

The Application allows visitors to browse through the list of childminders.
After registration they can also register as childminder(nanny).

Navigation 
Guests can see the links to Home, List, Login and Register.
Logged-in users that are not registered as nanny can see Home, List, Welcome "user", Register as Nanny, Logout.
Logged-in nannies can see Home, List, Welcome "user", Profile, Logout.

Home
Information about the site. Visible without authentication.

List All Childminders
List of all nannies. Visible without authentication.
Clicking on [read more] button should redirect to login if not registered user.

Register User
By clicking the "Register" button the registration form is loaded. When the "Register" button of the form is clicked, a post request is sent.
A validation is made with notifications.
The response is the user object with property accessToken. The token will be send with header in the following requests if it is needed.
After successful registration the user should be redirected to List page.

Login User
If the user has already registration, the user can login by using the login form. 
A validation is made with notifications.
The response is the user object with property accessToken. The token will be send with header in the following requests if it is needed.
After successful login the user should be redirected to List page.

Logout User
The logged in user can be logged out by clicking the logout button. 
Request to log out is sent to the server.
The currentUser will be set to undefined.

Register as Nanny
A validation is made with notifications.
After successful creation the user should be redirected to List page.

Nanny Details
Visible with authentication.

Profile
Profile is visible only for registered nannies.

Edit Nanny
By clicking on "Edit" button in Profile Page the nanny is allowed to fill in a form. Validation is the same as the validation in nanny-register. PUT request will be send.

Delete Nanny
By clicking on "Delete" button in Profile Page DELETE request will be sent to the back-end and deletes the nanny. Then the app redirects to the List.

Error Page


