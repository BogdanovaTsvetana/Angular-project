const router = require('express').Router();  
const { isUser} = require('../middlewares/guards.js');    

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
        res.status(201).json(nannyUpdated);
    }catch(err) {
        res.status(err.status || 400).json({ message: err.message });
    }   
});

module.exports = router;