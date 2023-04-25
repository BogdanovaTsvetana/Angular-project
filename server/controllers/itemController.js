const router = require('express').Router();
const { isUser } = require('../middlewares/guards.js');
const { parseError } = require('../util/parsers.js');
const { getUserByEmail, editUser, getUserById } = require('../services/userService.js');

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

// router.post('/', isUser(), async (req, res) => {    TODO 
router.post('/', async (req, res) => {     // TODO  isUser(), 
   
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
            user: req.user._id,   // TODO
        };

        const item = await req.storage.createItem(itemData);
        console.log('router.post item')

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
       
        console.log('In item controller');
        await editUser(req.user._id, userUpdate);
        res.status(201).json(item);
        
    } catch(err) {
        const message = parseError(err);
        res.status(err.status || 400).json({ message });
        console.log(err.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const item = await req.storage.getItemById(req.params.id);
           
        // let itemData = {...item, owner: item.owner}     // TODO
       
        res.json(item)
      
    }catch(err) {
        console.log(err.message);
        res.status(err.status || 400).json( err.message );
     
    }
});

router.get('/profile/:userId', async (req, res) => {  // 
    try {
        const item = await req.storage.getItemByUserId(req.params.userId);
        res.json(item);
    }catch(err) {
        console.log(err.message);
        res.status(err.status || 400).json( err.message );
     
    }
});


router.put('/:id', isUser(), async (req, res) => {    // isOwner
    try {
        const item = await req.storage.getItemById(req.params.id);

        if (req.user._id != item.user._id) {         // TODO  PROMENIH !!!!!
            throw new Error('You are not allowed to make changes!');    // TODO
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

        res.json(updatedItem)
        
    } catch(err) {
        console.log(err.message);
        res.status(err.status || 400).json( err.message );
      
    }
});

router.delete('/:id', isUser(), async (req, res) => {
    try {
        const item = await req.storage.getItemById(req.params.id);
        const user = await getUserById(req.user._id);
        const itemComments = item.comments;
        console.log('>> old itemComments')
        console.log(itemComments)

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
            // nanny: ,
            memberSince: user.memberSince,
            inbox: user.inbox,
            favourites: user.favourites,
            conversations: user.conversations,
            __v: 0,
        }

        await editUser(user._id, userUpdate);

        for( let comment of itemComments){
            console.log('in ItemController, delete item')
            let commentId = (comment._id).toString();
            await req.storage.deleteComment(commentId);
        }

        console.log('deleted')
        res.status(204).json();
    } catch(err) {
        console.log(err.message);
        res.status(err.status || 400).json( err.message );
    }
});


// ne raboti
// router.put('/like/:id', isUser(), async (req, res) => {    
//     try {
//         const itemId = req.params.id;
//         const userId = req.user._id;
//         const item = await req.storage.getItemById(itemId);

//         if (userId == item.user._id) {         // TODO  PROMENIH !!!!!
//             throw new Error(`You can't like yourself`);    // TODO
//         }
        
//         const updatedItem = await req.storage.likeItem(itemId, userId);
//         console.log('>>> Item liked')
//         res.json(updatedItem)

//     } catch(err) {
//         console.log(err.message);
//         res.status(err.status || 400).json( err.message );
      
//     }
// });

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
        console.log('>>> Item liked')
        res.json(updatedItem)

    } catch(err) {
        console.log(err.message);
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
        console.log('>>> Item unliked')
        res.json(updatedItem)

    } catch(err) {
        console.log(err.message);
        res.status(err.status || 400).json({ message: err.message });
    }
});


module.exports = router;

