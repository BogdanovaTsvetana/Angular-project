const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = require('../config/index.js');  

module.exports = () => (req, res, next) => {

    const token = req.headers['x-authorization']
    
    try {
        if (token) {
            const userData = jwt.verify(token, TOKEN_SECRET);
            req.user = userData;
        }
        next();
    } catch(err) {
        res.status(401).json({ message: 'Invalid access token. Please sign in.'})
    } 
};