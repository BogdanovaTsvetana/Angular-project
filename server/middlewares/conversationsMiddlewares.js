const conversationService = require('../services/conversationService.js');

module.exports = () => (req, res, next) => {    //  1
  
    req.conversations = {
        ...conversationService
    };

    next();
}

