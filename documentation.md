Project "Sofia Nannies" 

* To run server cd server folder and node index.js

The Application allows visitors to browse through the list of nannies.
After registration they can also register as nanny.

Navigation 
Guests can see the links to Home, List, Login and Register.
Logged users that are not registered as nanny can see Home, List, Welcome "user", Register as Nanny, Profile, Inbox, Logout.
Logged nannies can see Home, List, Welcome "user", Profile, Inbox, Logout.

Home
Information about the site. Visible without authentication.

List All Nannies
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
If the logged user is not the displayed nanny, [ Send message ] button and text area are visible (can be used) in Details Page. By clicking on it, the user can send message.
By clicking on Send button, POST request will be made and the message will be saved.
Same as Comments and Like button.

Profile
Profile is visible only for registered users. By clicking on "Edit" button in Profile Page the user is allowed to fill in a form. Validation is the same as the validation in user-register. PUT request will be send.
By clicking on "Delete" button in DELETE request will be sent to the back-end and deletes the user. 

Nanny Profile
Nanny Profile is visible only for registered users. By clicking on "Edit" button in Nanny Profile Page the nanny is allowed to fill in a form. Validation is the same as the validation in nanny-register. PUT request will be send.
By clicking on "Delete" button in DELETE request will be sent to the back-end and deletes the nanny. 

Inbox
By clicking on Inbox button in the menu, all conversations of the registered user will be loaded with information about the other user and if there are new messages.
By clicking on [All messages] button on specific conversation, a page with all messages from that conversation will be loaded. When the user come back to Inbox, the new messages for that conversation will be zero.

Detaild Conversation Page
All messages from that conversation will be loaded. 
By clicking on Send button, POST request will be made and the message will be saved.
The new message will be seen.


Error Page


