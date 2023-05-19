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
        res.json(sendUserWithoutPass(registerData));
    } catch (err) {
        res.status(err.status || 400).json({ message: err.message });
    }  
});


router.post('/login', isGuest(), async (req, res) => {
    try {
        const userData = await login(req.body.email, req.body.password);
        res.json(sendUserWithoutPass(userData));
    } catch(err) {
        res.status(err.status || 400).json({ message: err.message }); 
    }
});


router.get('/logout', isUser(), (req, res) => {    
    res.status(204).json();
});

router.get('/:id', async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        res.json(sendUserWithoutPass(user));
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
        const updatedUser = await editUser(req.params.id, newUser);
        res.json(sendUserWithoutPass(updatedUser));
    } catch(err) {
        res.status(err.status || 400).json( err.message );
    }
});

router.delete('/:id', isUser(), async (req, res) => {
    console.log('authController, deleteUser')
    try {
        const user = await getUserById(req.user._id);

        if(user.isNanny){
            await req.storage.deleteItem(user.nanny._id);
            await deleteUser(req.user._id);
        } else {
            await deleteUser(req.user._id);
        }

        res.status(204).json();
    } catch(err) {
        res.status(err.status || 400).json( err.message );
    }
});

function sendUserWithoutPass(userData){
    const { hashedPassword, __v, ...dataToSend } = userData;
    return dataToSend;
}

module.exports = router;




