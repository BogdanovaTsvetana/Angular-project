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
    
    //return items;

    // let options = {}
    // if(query) {
    //     options.category = { $regex: query.category, $options: 'i'}
    //     console.log(options)
    // }
    //const items = await Housing.find(options).lean();  //  TODO  change Model
    // const items = await Item.find({}).populate('user').lean();  //  TODO  to put this
    const items = await Item.find({}).lean();  //  TODO  change Model
    //console.log(items)

     return items;

}

async function getAll(query) {
    let cubes = Object
                    .entries(data)
                    .map(([id, v]) => Object.assign({}, { id }, v));

    if (query.search) {
        cubes = cubes.filter(c => c.name.toLowerCase().includes(query.search.toLowerCase()));
    };
    
    if (query.from) {
        cubes = cubes.filter(c => c.difficulty >= Number(query.from));
    }

    if (query.to) {
        cubes = cubes.filter(c => c.difficulty <= Number(query.to));
    }

    return cubes;
}

async function getItemById(id) {
    const nanny = await Item
        .findById(id)
        // .populate({
        //     path: 'comments',
        //     populate: { path: 'author' }  
        // }) 
        .populate('comments')
        .lean();   // TODO

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


module.exports = {
    createItem,
    getAllItems,
    getItemById,
    getItemByUserId,
    editItem,
    deleteItem,
    createComment,

}

