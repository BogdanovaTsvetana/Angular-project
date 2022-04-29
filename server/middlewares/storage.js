const itemService = require('../services/itemService.js');

module.exports = () => (req, res, next) => {    //  1
    
    req.storage = {
        ...itemService
    };

    next();
}



