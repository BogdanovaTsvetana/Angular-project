const router = require('express').Router();
const { isUser } = require('../middlewares/guards.js');
const { parseError } = require('../util/parsers.js');
const { editUser, getUserById } = require('../services/userService.js');

router.get('/', async (req, res) => {
    console.log(req.query)
    try {
        const item = await req.storage.getAllItems(req.query);  
        res.status(200).json(item);
      
    } catch(err) {
        const message = parseError(err);
        res.status(err.status || 400).json({ message });
        console.log(message);
    }
});

router.post('/', isUser(), async (req, res) => {   
   
    try {
        const user = await getUserById(req.user._id);

        const itemData = {
            firstName: user.firstName,
            lastName: user.lastName,
            workingTime: req.body.workingTime,
            description: req.body.description,
            drivingLicence: req.body.drivingLicence,
            gender: req.body.gender,
            image: req.body.image,
            phone: req.body.phone,
            created_at: new Date(),
            user: req.user._id,   
        };

        const item = await req.storage.createItem(itemData);

        const userUpdate = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            hashedPassword: user.hashedPassword,
            isNanny: true,
            nanny: item._id,
            memberSince: user.memberSince,
            inbox: user.inbox,
            favourites: user.favourites,
            conversations: user.conversations,
            __v: 0,
        }
       
        await editUser(req.user._id, userUpdate);
        res.status(201).json(item);
        
    } catch(err) {
        const message = parseError(err);
        res.status(err.status || 400).json({ message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const item = await req.storage.getItemById(req.params.id);      
        res.json(item); 
    }catch(err) {
        res.status(err.status || 400).json( err.message );
    }
});

router.get('/profile/:userId', async (req, res) => {  
    try {
        const item = await req.storage.getItemByUserId(req.params.userId);
        res.json(item);
    }catch(err) {
        res.status(err.status || 400).json( err.message );
    }
});


router.put('/:id', isUser(), async (req, res) => {    
    try {
        const item = await req.storage.getItemById(req.params.id);

        if (req.user._id != item.user._id) {         
            throw new Error('You are not allowed to make changes!');  
        }
        
        const newData = {
            description: req.body.description,
            gender: req.body.gender,
            workingTime: req.body.workingTime,
            drivingLicence: req.body.drivingLicence,
            image: req.body.image,
            user: req.user._id,
            phone: req.body.phone,
        };
        const updatedItem = await req.storage.editItem(req.params.id, newData);

        res.json(updatedItem);  
    } catch(err) {
        res.status(err.status || 400).json( err.message );
    }
});

router.delete('/:id', isUser(), async (req, res) => {
    try {
        const item = await req.storage.getItemById(req.params.id);
        const user = await getUserById(req.user._id);

        if ( item.user._id != req.user._id) {         
            throw new Error('You haven\'t created this nanny!');   
        }

        await req.storage.deleteItem(req.params.id);

        const userUpdate = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            hashedPassword: user.hashedPassword,
            isNanny: false,
            memberSince: user.memberSince,
            inbox: user.inbox,
            favourites: user.favourites,
            conversations: user.conversations,
            __v: 0,
        }

        await editUser(user._id, userUpdate);
        res.status(204).json();
    } catch(err) {
        res.status(err.status || 400).json( err.message );
    }
});


router.put('/like/:id', isUser(), async (req, res) => {    
    try {
        const itemId = req.params.id;
        const item = await req.storage.getItemById(itemId);
        const user = await getUserById(req.user._id);
        if (user._id == item.user._id.toString()) {       
            throw new Error(`You can't like yourself`);    
        }

        item.likes.push(user._id);    
        const updatedItem = await req.storage.editItem(itemId, item);
        res.json(updatedItem);
    } catch(err) {
        res.status(err.status || 400).json({ message: err.message }); 
    }
});

router.put('/unlike/:id', isUser(), async (req, res) => {    
    try {
        const itemId = req.params.id;
        const item = await req.storage.getItemById(itemId);
        const user = await getUserById(req.user._id);
        if (user._id == item.user._id.toString()) {       
            throw new Error(`You can't unlike yourself`);    
        }

        item.likes = item.likes.filter(u => u.toString() != user._id); 
        const updatedItem = await req.storage.editItem(itemId, item);
        res.json(updatedItem);
    } catch(err) {
        res.status(err.status || 400).json({ message: err.message });
    }
});


module.exports = router;

