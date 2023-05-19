const router = require('express').Router();   
const { isUser} = require('../middlewares/guards.js');     
const userService = require('../services/userService.js');  

// Create conversation and send first message 
router.post('/:userId/create/:receiverId', isUser(), async (req, res) => { 
    const userId = req.params.userId;
    const receiverId = req.params.receiverId;

    try {
        const user = await userService.getUserById(userId);
        const receiver = await userService.getUserById(receiverId);

        const messageData = {
            authorFirstName: user.firstName,
            authorLastName: user.lastName,
            message: req.body.message,
            postDate: new Date(),
        }

        let conversationData = {
            userName1: `${user.firstName} ${user.lastName}`,
            userName2: `${receiver.firstName} ${receiver.lastName}`
        }

        let conversation = await req.conversations.createConversation(user._id, receiver._id, conversationData);
        const message = await req.conversations.sendMessage(conversation._id, messageData)
        res.status(201).json(message);

    }catch(err) {
        console.log(err.message);
        res.status(err.status || 400).json( { message: err.message } );
    }   
});


// Your Conversations Inbox  
router.get('/:userId', isUser(), async (req, res) => {
    const userId = req.params.userId;

    try {
        const conversations = await req.conversations.getUserConversations(userId);
        res.json(conversations);
    }catch(err) {
        res.status(err.status || 400).json( { message: err.message } );
    }   
});

// Conversation Details 
router.get('/:userId/:conversationId', isUser(), async(req, res) => { 
    const userId = req.params.userId;
    const conversationId = req.params.conversationId;
    try{
        let conversation = await req.conversations.getConversationById(conversationId);
        let user = await userService.getUserById(userId);
        let messages = conversation.messages;

        for ( let m of messages ) {
            if (( m.authorFirstName != user.firstName )
                && ( m.authorLastName != user.LastName )
                && (m.read == false)) {
                m.read = true;
                await req.conversations.editMessage(m._id, m);
            } 
        }

        let conversationRead = await req.conversations.getConversationById(conversationId);
        res.json(conversationRead);
    }catch(err){
        res.status(err.status || 400).json( { message: err.message } );
    }

});

// Conversation Details  
router.post('/:userId/:conversationId', isUser(), async(req, res) => { // to del user

    const conversationId = req.params.conversationId;
    const messageData = {
        authorFirstName: req.body.authorFirstName,
        authorLastName: req.body.authorLastName,
        message: req.body.message.trim(),
        postDate: new Date(),
    };
    
    try{
        // const conversation = await req.conversations.getConversationById(conversationId);
        const message = await req.conversations.sendMessage(conversationId, messageData);      
        res.json(message);
    }catch(err){
        res.status(err.status || 400).json( { message: err.message } );
    }
});


module.exports = router;

