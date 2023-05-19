const bcrypt = require('bcrypt');    
const jwt = require('jsonwebtoken');  
const { TOKEN_SECRET } = require('../config/index.js');   
const User = require('../models/User.js');

               
async function register({firstName, lastName, email, password, memberSince}) {      
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
        email,                   
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

function generateToken(user) {    
    
    const token = jwt.sign({
        _id: user._id,          
    }, TOKEN_SECRET); 
    
    return token;
}

async function login(email, password){
    const pattern = new RegExp(`^${email}$`, 'i')
    const user =  await User.findOne({ email: { $regex: pattern} });

    if( !user ) {
        const err = new Error('Incorrect username or password!');
        err.status = 401;  
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
    const user = await User.findById(id).populate('nanny').populate('conversations').lean();   
    return user;
}

async function editUser(userId, newData) {       
    const user = await User.findById(userId);
    if(!user) {
        throw new Error('No such user in database!')
    }

    await User.findOneAndReplace({ _id: userId}, newData).lean();
    const newUser = await User.findById(userId).lean();
    return newUser;
}


async function getUserByEmail(email) {              
    const pattern = new RegExp(`^${email}$`, 'i')
    const user =  await User.findOne({ email: { $regex: pattern} });  
    return user;
}


async function deleteUser(id) {
    return User.findByIdAndDelete(id);  
}


module.exports = {
    register,
    login,
    editUser,
    getUserByEmail,         
    getUserById,
    deleteUser,
}