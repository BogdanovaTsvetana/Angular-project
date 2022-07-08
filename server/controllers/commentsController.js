const router = require('express').Router();   // use only once      //  1

const { isGuest, isUser} = require('../middlewares/guards.js');     // 2
const userService = require('../services/userService.js');  // 1
//const Comment = require('../models/Comment.js');

// Create comment
router.post('/:nannyId', isUser(), async (req, res) => { 
 
    const nannyId = req.params.nannyId;

    console.log('>> in commentsControler')
    console.log(nannyId, req.body.comment)


    try {
        const item = await req.storage.getItemById(nannyId);
    
        res.status(201).json({pruc: 2});
    }catch(err) {
        console.log(err.message);
        res.status(err.status || 400).json( err.message );
    }   
});


module.exports = router;