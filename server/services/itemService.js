const Item = require('../models/Item.js');    //  TODO
const User = require('../models/User.js');
const Comment = require('../models/Comment.js');

async function createItem(itemData) {

    const item = new Item(itemData);   
    await item.save(); 
    return item;
}

async function getItemByUserId(userId){
    const item = await Item.find({ user: userId });
    return item;
}

async function getAllItems(query) {
    console.log('>> in itemService')
    console.log(query)
    const options = {};

    if (query.time) {
        options.workingTime = query.time;
    };

    if (query.dl) {
        options.drivingLicence = query.dl;
    };

    if (query.gender) {
        options.gender = query.gender;
    };

    console.log(options)
    const items = Item.find(options).lean();  
    return items;
}

async function getItemById(id) {
    console.log('>>5' + id)
    const nanny = await Item
        .findById(id)
        // .populate({
        //     path: 'comments',
        //     populate: { path: 'author' }  
        // }) 

        .populate('comments')
        .lean();   // TODO
    console.log('>>5' )
    if(nanny) {

        // const viewModel = {
        //     _id: nanny._id,
        //     firstName: nanny.firstName,
        //     lastName: nanny.lastName,
        //     workingTime: nanny.workingTime,
        //     description: nanny.description,
        //     drivingLicence: nanny.drivingLicence,
        //     gender: nanny.gender,
        //     image: nanny.image,
        //     phone: nanny.phone,
        //     postDate: nanny.postDate,
        //     user: nanny.user,   // TODO
        //     comments: nanny.comments.map(c=> ({content: c.content, author: c.author?.firstName + ' ' + c.author?.lastName})),     // TODO   to test
        //     likes: nanny.likes,     //  TODO
        // }

        return nanny;
    } else {
        throw new Error('No such nanny in database')
    }
}

async function editItem(id, newData){
    console.log('>> in service/editItem')
    const item = await Item.findById(id);   

    if(!item) {
        throw new Error('No such ID in database')     
    }
 
    Object.assign(item, newData);

    await item.save();
    return item;
}

async function deleteItem(id) {
    return Item.findByIdAndDelete(id);  
  
}

async function createComment(itemId, comment) {
    const item = await Item.findById(itemId);
   
    if (!item) {
        throw new ReferenceError('No such id in database');
    }

    const newComment = new Comment(comment);
    await newComment.save();

    item.comments.push(newComment);
    return item.save();
}

// async function likeItem(itemId, userId){
//     const item = await Item.findById(id);   
   
//     if(!item) {
//         throw new Error('No such item in database')     
//     }

//     await item.updateOne(itemId, {$addToSet: { likes: userId }})
//     return item;
// }


// postModel.updateOne({ _id: postId }, { $addToSet: { likes: userId } }, { new: true })
module.exports = {
    createItem,
    getAllItems,
    getItemById,
    getItemByUserId,
    editItem,
    // likeItem,
    deleteItem,
    createComment,

}

