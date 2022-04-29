const jwt = require('jsonwebtoken');

const { TOKEN_SECRET } = require('../config/index.js');  // 1

module.exports = () => (req, res, next) => {
    console.log(req.headers['x-authorization'])
    //next()
    const token = req.headers['x-authorization']
    
    try {
        if (token) {
            const userData = jwt.verify(token, TOKEN_SECRET);
            req.user = userData;
            console.log('>> in server, auth, userData ot tokena ')
            console.log(userData)
        }
        next();
    } catch(err) {
        res.status(401).json({ message: 'Invalid access token. Please sign in.'})
    } 
};