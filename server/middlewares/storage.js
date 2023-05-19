const itemService = require('../services/itemService.js');

module.exports = () => (req, res, next) => {  
    
    req.storage = {
        ...itemService
    };

    next();
}



