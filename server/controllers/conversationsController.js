const router = require('express').Router();   // use only once      //  1
const { isUser} = require('../middlewares/guards.js');     // 2
const userService = require('../services/userService.js');  // 1
const Conversation = require('../models/Conversation.js');

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
            user1: user._id,
            user2: receiver._id,
        }

        // TODO  to think - existing conversation
        // let message;
        // let existingConversationId;
        // if ( user.conversations.length > 0 ) {
        //     for ( let c of user.conversations ) {
        //         console.log('c')
        //         console.log(c)
        //         if ( c.user1.toString() == receiverId || c.user2.toString() == receiverId ) {
        //             existingConversationId = c._id.toString();
        //             console.log('tuk')
        //             console.log('existingConversationId')
        //         }
        // }}

        // if ( existingConversationId ) {
        //     message = await req.conversations.sendMessage(existingConversationId, messageData);
        // } else {
        //     let conversationNew = await req.conversations.createConversation(user._id, receiver._id, conversationData);
        //     message = await req.conversations.sendMessage(conversationNew._id, messageData)
        // }
            

        
        // if ( user.conversations.length = 0 )  {
        //     let conversationNew = await req.conversations.createConversation(user._id, receiver._id, conversationData);
        //     message = await req.conversations.sendMessage(conversationNew._id, messageData)
        // }
        
        // console.log('conversations controller')
        // res.status(201).json(message);
///////////////
        let conversation = await req.conversations.createConversation(user._id, receiver._id, conversationData);
        const message = await req.conversations.sendMessage(conversation._id, messageData)
        res.status(201).json(message);

    }catch(err) {
        console.log(err.message);
        res.status(err.status || 400).json( { message: err.message } );
    }   
});


// Your Conversations inbox  
router.get('/:userId', isUser(), async (req, res) => {
    const userId = req.params.userId;

    try {
        const conversations = await req.conversations.getUserConversations(userId);

        console.log('in Inbox controller')
        console.log(conversations)
        
        res.json(conversations)
    }catch(err) {
        console.log(err.message);
        res.redirect('/404');
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

            let newM = await req.conversations.editMessage(m._id, m);

            user.inbox--;  
            req.user.inbox--; 
            await userService.editUser(userId, user)
            } 
        }

        let conversationRead = await req.conversations.getConversationById(conversationId);

        console.log(conversationRead)
        res.json(conversationRead)
    }catch(err){
        console.log(err.message);
        res.status(err.status || 400).json( { message: err.message } );
    }

});

// Conversation Details  
router.post('/:userId/:conversationId', isUser(), async(req, res) => {
    const userId = req.params.userId;
    const conversationId = req.params.conversationId;
    const messageData = {
        authorFirstName: req.body.authorFirstName,
        authorLastName: req.body.authorLastName,
        message: req.body.message.trim(),
        postDate: new Date(),
    };
    
    try{
        const conversation = await req.conversations.getConversationById(conversationId);
        //const user = await userService.getUserById(userId);
        let user1_id = conversation.user1._id;
        let user2_id = conversation.user2._id;
        
        // Check who is 
        let receiverId;
        if ( userId == user1_id) {
            receiverId = user2_id;
        } else if ( userId == user2_id ) {
            receiverId = user1_id;
        }

        const receiver = await userService.getUserById(receiverId);

         // In case the receiver has deleted the conversation
        let conversationsReceiver = receiver.conversations;
        console.log('>>> conversationsReceiver')
        console.log(conversationsReceiver)
        let hasConversation = conversationsReceiver.some(c => c._id.equals(conversationId));
        console.log('>> hasConversation   ', hasConversation)

        if ( !hasConversation ) {
            receiver.conversations.push(conversation);
        }
        // In case the receiver has deleted the conversation    - end

        const message = await req.conversations.sendMessage(conversationId, messageData);
        receiver.inbox++;
        await userService.editUser(receiverId, receiver);       
        res.json(message)
    }catch(err){
        console.log(err.message);
        res.status(err.status || 400).json( { message: err.message } );
    }
});

// Conversation Details Delete  
router.delete('/:userId/:conversationId', isUser(), async(req, res) => {  
    const userId = req.params.userId;
    const conversationId = req.params.conversationId;
    let otherUserId;

    try{
        const conversation = await req.conversations.getConversationById(conversationId);

        // Check who is the user and who is the other user
        if ( userId == conversation.user1._id ) {
            otherUserId = conversation.user2._id;
        } else if ( userId == conversation.user2._id ) {
            otherUserId = conversation.user1._id;
        }

        const user = await userService.getUserById(userId);
        const otherUser = await userService.getUserById(otherUserId);

        // delete the conversation in user's data ( in conversations[] )
        const userConversations = user.conversations;
        user.conversations = userConversations.filter(c => !(c._id.equals(conversationId)));
        await userService.editUser(userId, user);

        // check if the other user has deleted the conversation
        let otherUserConversations = otherUser.conversations;
        let otherUserHasConversation = otherUserConversations.some(c => c._id.equals(conversationId));
        
        // If the other user has deleted the conversation, delete the conversation and all its messages from the database.
        if ( !otherUserHasConversation ) {
            try{
                console.log('the other user has already deleted the conversation');
                let messages = conversation.messages;
                for (m of messages) {
                    console.log('delete one message')
                    await req.conversations.deleteMessage(m);
                }
                await req.conversations.deleteConversation(conversationId);

            } catch(err){
                console.log(err)
            }
        } 

        console.log('deleted')
        res.status(204).json();
    }catch(err){
        console.log(err.message);
        res.status(err.status || 400).json( { message: err.message } );
    }
});

module.exports = router;

