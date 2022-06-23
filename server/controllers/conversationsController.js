const router = require('express').Router();   // use only once      //  1

const { isGuest, isUser} = require('../middlewares/guards.js');     // 2
const userService = require('../services/userService.js');  // 1
const Conversation = require('../models/Conversation.js');

// Create conversation  send message 
router.post('/:userId/send-message/:receiverId', isUser(), async (req, res) => { 
    const messageData = req.body;
    // const username = req.params.username;
    // const receiverUsername = req.params.receiverUsername;
    // const itemTitle = req.params.itemTitle;
    const userId = req.params.userId;
    const receiverId = req.params.receiverId;

    try {
        // const user = await userService.getUserByUsername(username);
        // const receiver = await userService.getUserByUsername(receiverUsername);
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
            //subject: itemTitle,
        }

        let conversation = await req.conversations.createConversation(user._id, receiver._id, conversationData);
        const message = await req.conversations.sendMessage(conversation._id, messageData)
        console.log('conversations controller', messageData)
        res.status(201).json(messageData);
    }catch(err) {
        console.log(err.message);
        res.status(err.status || 400).json( err.message );
    }   
});

// Your Conversations inbox
router.get('/:username', isUser(), async (req, res) => {
    const username = req.params.username;

    try {
        const user = await userService.getUserByUsername(username);
        let conversationsRaw = user.conversations;
        
        let conversations = [];
        for(let i = 0; i < conversationsRaw.length; i++) {
            let conversationRaw = conversationsRaw[i];
            let newMessages = 0;

            for(m of conversationRaw.messages) {
                if (  (m.read == false) && (m.author != username )) {
                    newMessages++;
                }
                console.log(m.author)
            }

            let c = {
                username,
                conversationId: conversationRaw._id,
                withh: '',
                subject: conversationRaw.subject,
                newMessages,
            };
        
            let user1Username = conversationRaw.user1.username;
            let uder2Username = conversationRaw.user2.username;

            if ( user1Username == username ) {
                c.withh = uder2Username;
            } else if ( uder2Username == username ) {
                c.withh = user1Username;
            }
    
            conversations.push(c);
        }
        console.log(conversations)
        
        res.json(conversations)
    }catch(err) {
        console.log(err.message);
        res.redirect('/404');
    }   
});

// Conversation Details 2
router.get('/:username/:conversationId', isUser(), async(req, res) => {
    const username = req.params.username;
    const conversationId = req.params.conversationId;
    try{
        let conversation = await req.conversations.getConversationById(conversationId);
        let user = await userService.getUserByUsername(username);
        let messages = conversation.messages;

       for ( let m of messages ) {
            if ( m.author != username && (m.read == false)) {
            m.read = true;
            user.inbox--;  
            req.user.inbox--;
            
            let newM = await req.conversations.editMessage(m._id, m);
            newUser = await userService.editUser(username, user)
            } 
       }

        let ctx = {
            username,
            conversationId,
            withh: '',
            subject: conversation.subject,
            messages: conversation.messages,
        };
        
        let user1Username = conversation.user1.username;
        let user2Username = conversation.user2.username;

        if ( user1Username == username ) {
            ctx.withh = user2Username;
        } else if ( user2Username == username ) {
            ctx.withh = user1Username;
        }
    
        console.log(ctx)
        res.json(ctx)
    }catch(err){
        console.log(err.message);
        res.status(err.status || 400).json( err.message );
    }

});

// Conversation Details
router.post('/:username/:conversationId', isUser(), async(req, res) => {
    const username = req.params.username;
    const conversationId = req.params.conversationId;
    const messageData = {
        author: username,
        message: req.body.message,
    }
    console.log('username, conversationId, messageData')
    console.log(username, conversationId, messageData)

    let message = {};
    
    try{
        const conversation = await req.conversations.getConversationById(conversationId);
        let user1Username = conversation.user1.username;
        let uder2Username = conversation.user2.username;
        
        let receiverUsername;
        if ( user1Username == username ) {
            receiverUsername = uder2Username;
        } else if ( uder2Username == username ) {
            receiverUsername = user1Username;
        }

        const receiver = await userService.getUserByUsername(receiverUsername);

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

        try{
            message = await req.conversations.sendMessage(conversationId, messageData)
            receiver.inbox++;
            await userService.editUser(receiverUsername, receiver);
            //await req.conversations.editConversation(conversation._id, conversation);
        } catch(err){
            console.log(err)
        }
       
        res.json(message)
    }catch(err){
        console.log(err.message);
        res.status(err.status || 400).json( err.message );
    }
});


// Conversation Details Delete
router.delete('/:username/:conversationId', isUser(), async(req, res) => {   // isOwner()
    const username = req.params.username;
    const conversationId = req.params.conversationId;

    try{
        const conversation = await req.conversations.getConversationById(conversationId);
        // is owner
        let user1Username = conversation.user1.username;
        let uder2Username = conversation.user2.username;

        let receiverUsername;
        if ( user1Username == username ) {
            receiverUsername = uder2Username;
        } else if ( uder2Username == username ) {
            receiverUsername = user1Username;
        }

        const user = await userService.getUserByUsername(username);
        const receiver = await userService.getUserByUsername(receiverUsername);

        const userConversations = user.conversations;
        user.conversations = userConversations.filter(c => !(c._id.equals(conversationId)));
        await userService.editUser(username, user);

        let receiverConversations = receiver.conversations;
        let hasConversation = receiverConversations.some(c => c._id.equals(conversationId));
        
        if ( !hasConversation ) {
            try{
                console.log('hasConversation');
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
        res.status(err.status || 400).json( err.message );
    }
});



module.exports = router;

