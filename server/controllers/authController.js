
const router = require('express').Router();   
const { body, validationResult } = require('express-validator');     
const { isGuest, isUser} = require('../middlewares/guards.js');    
const { register, login, getUserById, editUser, deleteUser } = require('../services/userService.js');

router.post('/register',  
    isGuest(),
    body('email')
        .trim()
        .isEmail().withMessage('Invalid email'),
    body('firstName')
        .trim()
        .isLength({ min: 1 }).withMessage('First name is required'),
    body('lastName')
        .trim()
        .isLength({ min: 1 }).withMessage('Last name is required'),    
    body('password')
        .trim()
        .isLength({ min: 1 }).withMessage('Password is required'),
    
    async (req, res) => {
    try {
        const { errors } = validationResult(req);
        
        if(errors.length > 0) {
            //console.log('>>> errors   ', errors);
            const message = errors.map(e => e.msg).join('\n');
            throw new Error(message);
        }

        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password, 
            memberSince: new Date(),
        }
        
        const registerData = await register(userData);
    
        console.log('>>>>> in server authController')
        
        res.json(sendUserWithoutPass(registerData));
    } catch (err) {
        console.log('>> err from auth ', err.message)
        res.status(err.status || 400).json({ message: err.message }) // 409 Conflict
    }  
});


router.post('/login', isGuest(), async (req, res) => {
    try {
        console.log(req.body.email, req.body.password)
     
        const userData = await login(req.body.email, req.body.password);
        res.json(sendUserWithoutPass(userData));
    } catch(err) {
        console.log('>>> in authController/login  ', err.message);
        res.status(err.status || 400).json({ message: err.message }) // 409 Conflict
    }
});

//router.get('/logout', (req, res) => {  
router.get('/logout', isUser(), (req, res) => {    
    console.log('logged out')
    res.status(204).json();

})

router.get('/:id', async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
    //    console.log('>> authController, get user')
    //     console.log(user)
      
        res.json(sendUserWithoutPass(user))
    }catch(err) {
        console.log(err.message);
        res.status(err.status || 400).json( { message: err.message } );
    }
});

// Update user
router.put('/:id', async (req, res) => {
    const dataToUpdate = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
    };
  
    try {
        const user = await getUserById(req.params.id);
        const newUser = Object.assign(user, dataToUpdate);
        console.log('>>authControler, edit user')
        console.log(newUser)
        const updatedUser = await editUser(req.params.id, newUser);
        console.log('>>authControler, edit user')
        console.log(updatedUser)
        res.json(sendUserWithoutPass(updatedUser))
        
    } catch(err) {
        console.log(err.message);
        res.status(err.status || 400).json( err.message );
    }
})

router.delete('/:id', isUser(), async (req, res) => {
    console.log('authController, deleteUser')
    try {
        const user = await getUserById(req.user._id);
        const conversations = user.conversations;

        if(user.isNanny){
            console.log('isNanny')
            await req.storage.deleteItem(user.nanny._id);
            await deleteUser(req.user._id);
        } else {
            console.log('parent')
            await deleteUser(req.user._id);
        }

        for( let conversation of conversations){
            console.log('in AuthController, delete user')
            let conversationId = (conversation._id).toString();
            await req.storage.deleteComment(conversationId);
        }

        console.log('deleted')
        res.status(204).json();
    } catch(err) {
        console.log(err.message);
        res.status(err.status || 400).json( err.message );
    }
});

function sendUserWithoutPass(userData){
    const { hashedPassword, __v, ...dataToSend } = userData;
    return dataToSend;
}

module.exports = router;




