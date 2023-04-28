const User = require('../models/User.js');
const Conversation = require('../models/Conversation.js');
const Message = require('../models/Message.js');

async function createConversation(userId, receiverId, conversationData) {        // TODO
    const user = await User.findById(userId);
    const receiver = await User.findById(receiverId);

   if (!user || !receiver) {
    throw new ReferenceError('No such user in database');
    }

    const conversation = new Conversation(conversationData);
    await conversation.save();

    user.conversations.unshift(conversation);
    receiver.conversations.unshift(conversation);
    await user.save();
    await receiver.save();

    return conversation;
}

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


// async function getUserConversations(userId) {
//     const user = await User.findById(userId);
//     let conversations = user.conversations;  // [ ObjectId, ObjectId ]
//     let convPopulated = [];  //  [ Object, Object ]

//     if (!user ) {
//         throw new ReferenceError('No such user in database');
//         }

//       // if there are conversations
//     if ( user.conversations.length > 0 ) {
        
//         for(let i = 0; i < conversations.length; i++) {
//             let currentConversation = await getConversationById(conversations[i]);
 

//             if (!currentConversation ) {
//                 throw new ReferenceError('No such conversation in database');
//             }

//             let user1 = currentConversation.user1;
//             let vewUser1 = {
//                 _id: (user1._id).toString(),
//                 firstName: user1.firstName,
//                 lastName: user1.lastName
//             }

//             let user2 = currentConversation.user1;
//             let vewUser2 = {
//                 _id: (user2._id).toString(),
//                 firstName: user2.firstName,
//                 lastName: user2.lastName
//             }

//             let vewConversation = {
//                 _id: (currentConversation._id).toString(),
//                 user1: vewUser1,
//                 user2: vewUser2,
//                 messages: currentConversation.messages
//             }

//             console.log('user1')
//             console.log(vewConversation)
         

//             // let user1 = await getUserById(user1Id);
//             // let user1View = {
//             //     _id: user1._id,
//             //     firstName: user1.firstName
//             // }

//             // console.log(user1View)


//             console.log('in ConversationService, getUserConversations, currentConversation')
//             // console.log(currentConversation)
//             convPopulated.push(vewConversation)
//         }
        
//         //user.conversations = convPopulated;
//     }
           
//     console.log('Conversation Service / getUserConversations')
//     // console.log(convPopulated)

//     return convPopulated;
// }

async function getUserConversations(userId) {
    const user = await User.findById(userId);
    let conversations = user.conversations;  
    let convPopulated = [];  

    if (!user ) {
        throw new ReferenceError('No such user in database');
        }

    if ( user.conversations.length > 0 ) {
        
        for(let i = 0; i < conversations.length; i++) {
            let currentConversation = await getConversationById(conversations[i]);
 
            if (!currentConversation ) {
                throw new ReferenceError('No such conversation in database');
            }

            console.log('in ConversationService, getUserConversations, currentConversation')
            convPopulated.push(currentConversation)
        }
    }       

    return convPopulated;
}
    

async function getConversationById(id) {
    console.log('>> convServ getCByID')
    const conversation = await Conversation.findById(id)
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

// async function deleteMessage(message){
//     return Message.findByIdAndDelete(message);
// }

// async function deleteConversation(id) {
//     return Conversation.findByIdAndDelete(id);
// }

module.exports = {
    sendMessage,
    createConversation,
    getUserConversations,
    getConversationById,
    getMessageById,
    editMessage,
    // deleteConversation,
    // deleteMessage,
}
