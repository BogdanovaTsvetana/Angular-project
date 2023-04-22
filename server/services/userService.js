// all is written at first step
const User = require('../models/User.js');
const Conversation = require('../models/Conversation.js');
const Message = require('../models/Message.js');
const { getConversationById } = require('../services/conversationService.js')
const bcrypt = require('bcrypt');    // 1
const jwt = require('jsonwebtoken');                  // 1
const { TOKEN_SECRET } = require('../config/index.js');  // 1

async function register({firstName, lastName, email, password, memberSince}) {        // 12-06
    const existEmail = await User.findOne({ email });
          
        if (existEmail) {
            const err = new Error('Email is taken!');
            err.status = 409;
            throw err;
        }

    const hashedPassword = await bcrypt.hash(password, 10);
             
    const user = new User({
        firstName,
        lastName,
        email,                   // TODO
        hashedPassword,
        memberSince,
    });

    await user.save();

    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isNanny: user.isNanny,
        memberSince: user.memberSince,
        inbox: user.inbox,
        nanny: user.nanny | '',
        favourites: user.favourites,
        conversations: user.conversations,
        accessToken: generateToken(user)
    } 
}

function generateToken(user) {    // 1
    
    const token = jwt.sign({
        _id: user._id,          
    }, TOKEN_SECRET); 
    
    return token
}

async function login(email, password){
    const pattern = new RegExp(`^${email}$`, 'i')
    const user =  await User.findOne({ email: { $regex: pattern} });
    console.log(user)

    if( !user ) {
        console.log('no such user')
        const err = new Error('Incorrect username or password!');
        err.status = 401;  // Unauthorized
        throw err;
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
        console.log('pass does not match')
        const err = new Error('Incorrect username or password');
        err.status = 401;  // Unauthorized
        throw err;
    }

    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isNanny: user.isNanny,
        memberSince: user.memberSince,
        inbox: user.inbox,
        nanny: user.nanny | '',
        favourites: user.favourites,
        conversations: user.conversations,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isNanny: user.isNanny,
        accessToken: generateToken(user)
    } 

}

async function getUserById(id) {
    const user = await User.findById(id).populate('nanny').populate('conversations').lean();   // TODO
    console.log('>> in getUserById')
    // console.log(userData)
    return user;
}

async function editUser(userId, newData) {        // NEW
    console.log('>> in userService, editUser')
    const user = await User.findById(userId);
    if(!user) {
        throw new Error('No such user in database!')
    }

    // Object.assign(user, newData);
    await User.findOneAndReplace({ _id: userId}, newData).lean();
    const newUser = await User.findById(userId).lean();
    console.log('>> 1')
    console.log(newUser)
    return newUser;
}

// async function getUserByUsername(username) {
//     const pattern = new RegExp(`^${username}$`, 'i')
//     const user =  await User.findOne({ username: { $regex: pattern} }).lean();
    
//     if (user && (user.conversations.length > 0) ) {
//         let conversations = user.conversations;

//         let convPopulated = [];
//         for(let i = 0; i < conversations.length; i++) {
//             let conv = await getConversationById(conversations[i]);
//             convPopulated.push(conv)
//         }

//     user.conversations = convPopulated;
//     }
   
//     //console.log('in userservice getUserByUsername:')
//     //console.log(user)
//     return user;
   
// }


async function getUserByEmail(email) {               // TODO
    const pattern = new RegExp(`^${email}$`, 'i')
    const user =  await User.findOne({ email: { $regex: pattern} });  // find returns array
    return user;
}

async function deleteUser(id) {
    console.log('>> in userService, deleteUser')
    return User.findByIdAndDelete(id);  
}


module.exports = {
    register,
    login,
    editUser,
    // getUserByUsername,
    getUserByEmail,          // TODO
    getUserById,
    deleteUser,
}