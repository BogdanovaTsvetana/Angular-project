const conversationService = require('../services/conversationService.js');

module.exports = () => (req, res, next) => {    
  
    req.conversations = {
        ...conversationService
    };

    next();
}

