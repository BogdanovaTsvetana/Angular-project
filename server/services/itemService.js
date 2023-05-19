const Item = require('../models/Item.js');    
const Comment = require('../models/Comment.js');

async function createItem(itemData) {
    const item = new Item(itemData);   
    await item.save(); 
    return item;
}


async function getAllItems(query) {

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

    const items = Item.find(options).lean();  
    return items;
}


async function getItemById(id) {
    const item = await Item.findById(id).populate('comments').lean();   
    if(item) {
        return item;
    } else {
        throw new Error('No such nanny in database');
    }
}


async function editItem(id, newData){
    const item = await Item.findById(id);   

    if(!item) {
        throw new Error('No such ID in database')     
    }
 
    Object.assign(item, newData);
    await item.save();
    return item;
}


async function deleteItem(id) {
    const item = await Item.findById(id);   

    if(!item) {
        throw new Error('No such ID in database');     
    }

    const itemComments = item.comments;
    
    for( let comment of itemComments){
        let commentId = (comment._id).toString();
        await deleteComment(commentId);
    }

    return Item.findByIdAndDelete(id); 
}


async function createComment(itemId, comment) {
    const item = await Item.findById(itemId);
   
    if (!item) {
        throw new ReferenceError('No such id in database');
    }

    const newComment = new Comment(comment);
    await newComment.save();
    item.comments.unshift(newComment);
    return item.save();
}


async function deleteComment(commentId) {
    return Comment.findByIdAndDelete(commentId);
}


module.exports = {
    createItem,
    getAllItems,
    getItemById,
    editItem,
    deleteItem,
    createComment,
    deleteComment,
}

