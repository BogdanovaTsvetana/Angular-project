const User = require('../models/User.js');
const Conversation = require('../models/Conversation.js');
const Message = require('../models/Message.js');

async function sendMessage(conversationId, messageData){
    const conversation = await Conversation.findById(conversationId);    

    if (!conversation) {
        throw new ReferenceError('No such conversation in database');
    }
   
    const message = new Message(messageData);
    await message.save();
    conversation.messages.push(message);
    await conversation.save();

    return message;
}  


async function createConversation(userId, receiverId, conversationData) {        // TODO
    const user = await User.findById(userId);
    const receiver = await User.findById(receiverId);

   if (!user || !receiver) {
    throw new ReferenceError('No such user in database');
    }

    const conversation = new Conversation(conversationData);
    await conversation.save();

    user.conversations.push(conversation);
    receiver.conversations.push(conversation);
    receiver.inbox++;
    await user.save();
    await receiver.save();

    return conversation;
}

async function getUserConversations(userId) {
    const user = await User.findById(userId);
    let conversations = user.conversations;  // [ ObjectId, ObjectId ]
    let convPopulated = [];  //  [ Object, Object ]

    if (!user ) {
        throw new ReferenceError('No such user in database');
        }

      // if there are conversations
    if ( user.conversations.length > 0 ) {
        
        for(let i = 0; i < conversations.length; i++) {
            let currentConversation = await getConversationById(conversations[i]);

            if (!currentConversation ) {
                throw new ReferenceError('No such conversation in database');
            }

            console.log('in ConversationService, getUserConversations, currentConversation')
            console.log(currentConversation)
            convPopulated.push(currentConversation)
        }
        
        //user.conversations = convPopulated;
    }
           
    console.log('Conversation Service / getUserConversations')
    console.log(convPopulated)

    return convPopulated;
}
    

async function getConversationById(id) {
    const conversation = await Conversation.findById(id)
        .populate('user1')
        .populate('user2')
        .populate('messages')
        .lean(); 
   
    return conversation;
}



async function getMessageById(id) {
    const message = await Message.findById(id).lean();  
    return message;
}

async function editMessage(messageId, newData) {       
    const message = await Message.findById(messageId);
   
    if(message) {
        Object.assign(message, newData);

        await message.save();
        return message;
    }

}

async function deleteMessage(message){
    return Message.findByIdAndDelete(message);
}

async function deleteConversation(id) {
    return Conversation.findByIdAndDelete(id);
}

module.exports = {
    sendMessage,
    createConversation,
    getUserConversations,
    getConversationById,
    getMessageById,
    editMessage,
    deleteConversation,
    deleteMessage,
}
