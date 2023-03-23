const router = require('express').Router();   // use only once      //  1
const { isUser} = require('../middlewares/guards.js');     // 2

router.post('/:nannyId', isUser(), async (req, res) => { 
    const nannyId = req.params.nannyId;
    
    const commentData = {
        author: req.body.author,
        content: req.body.content.trim(),
        postDate: new Date(),
    }

    try {
        await req.storage.createComment(nannyId, commentData); 
        const nannyUpdated = await req.storage.getItemById(nannyId);
        console.log('>> in commentsControler')
        console.log(nannyUpdated.comments)
        res.status(201).json(nannyUpdated);
    }catch(err) {
        console.log(err.message);
        res.status(err.status || 400).json({ message: err.message });
    }   
});

module.exports = router;