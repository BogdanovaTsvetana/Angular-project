const router = require('express').Router();
const { isUser } = require('../middlewares/guards.js');
const { parseError } = require('../util/parsers.js');
const { getUserByEmail, editUser } = require('../services/userService.js');

router.get('/', async (req, res) => {
    
    try {
        const item = await req.storage.getAllItems(req.query);  // todo
        res.status(200).json(item);
      
    } catch(err) {
        const message = parseError(err);
        res.status(err.status || 400).json({ message });
        console.log(err.message);
    }
});

// router.post('/', isUser(), async (req, res) => {    TODO 
router.post('/', async (req, res) => {     // TODO  isUser(), 
   
    // const itemData = {
    //         // owner: req.user._id, 
    //         //name: req.body.name.trim(),
    //         workingTime: req.body.workingTime,
    //         description: req.body.description,
    //         drivingLicence: req.body.drivingLicence,
    //         gender: req.body.gender,
    //         image: req.body.image,
    //         phone: req.body.phone,
    //         //years: req.body.years,
    //         postDate: new Date(),
    //         user: req.user._id,   // TODO
    //         //user: 'userID',   // TODO 
    // };

    try {
        
        const user = await getUserByEmail(req.user.email);

        const itemData = {
            // owner: req.user._id, 
            //name: req.body.name.trim(),
            firstName: user.firstName,
            lastName: user.lastName,
            workingTime: req.body.workingTime,
            description: req.body.description,
            drivingLicence: req.body.drivingLicence,
            gender: req.body.gender,
            image: req.body.image,
            phone: req.body.phone,
            //years: req.body.years,
            postDate: new Date(),
            user: req.user._id,   // TODO
            //user: 'userID',   // TODO 
        };

        const item = await req.storage.createItem(itemData);
        console.log('router.post item')
        console.log(item)

        const userUpdate = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            hashedPassword: user.hashedPassword,
            userType: 'nanny',
            nanny: item._id,
            memberSince: user.memberSince,
            inbox: user.inbox,
            favourites: user.favourites,
            conversations: user.conversations,
            __v: 0,
        }
        // const user = await editUser(req.user.email, {userType: 'nanny', nanny: item._id});
        console.log('In item controller')
        const userNew = await editUser(req.user.email, userUpdate);
        console.log(userNew)
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
           
        let itemData = {...item, owner: item.owner}     // TODO
       
        res.json(itemData)
      
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
            throw new Error('You haven\'t created it!!');    // TODO
        }
        
        const newData = {
            // title: req.body.title,
            // year: req.body.year,
            // price: Number(req.body.price), //  currency
            // category: req.body.category,
            
            // // no PostDate
            // description: req.body.description,
            // image: req.body.image,

            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            years: req.body.years,
            workingTime: req.body.workingTime,
            drivingLicence: req.body.drivingLicence,
            description: req.body.description,
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
        const nannyId = req.params.nannyId;
        const item = await req.storage.getItemById(req.params.id);
        const user = await getUserByEmail(req.user.email);

        const userUpdate = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            hashedPassword: user.hashedPassword,
            userType: 'parent',
            nanny: '',
            memberSince: user.memberSince,
            inbox: user.inbox,
            favourites: user.favourites,
            conversations: user.conversations,
            __v: 0,
        }

        delete userUpdate.nanny;

    //     username: { type: String, required: true},
    // email: { type: String },
    // hashedPassword: { type: String , required: true},
    // userType: { type: String, default: 'parent' },
    // memberSince: { type: Date },
    // inbox: {type: Number, default: 0 },
    // nanny: { type: Schema.Types.ObjectId, ref: 'Item' },
    // favourites: [{ type: Schema.Types.ObjectId, ref: 'Item', default: [] }],
    // conversations: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],

        const userNew = await editUser(req.user.email, userUpdate);

        // const userConversations = user.conversations;
        // user.conversations = userConversations.filter(c => !(c._id.equals(conversationId)));
        // await userService.editUser(username, user);

        // const userNanny = user.nanny;
        // user.nanny = userNanny.filter(c => !(c._id.equals(nannyId)));
        // user.userType = 'parent';
        // await userService.editUser(req.user.email, user);

        console.log('bike.owner')
        console.log(item.user)
        if ( item.user._id != req.user._id) {          // TODO
            throw new Error('You haven\'t created it!');   // TODO
        }

        await req.storage.deleteItem(req.params.id);
        console.log('deleted')
        res.status(204).json();
    } catch(err) {
        console.log(err.message);
        res.status(err.status || 400).json( err.message );
       
    }
});


module.exports = router;

