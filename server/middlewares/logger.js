module.exports = () => (req, res, next) => {
    if ( req.url.startsWith('/static') == false) {
        console.log('>>>', req.method, req.url);
        if (req.user) {
            console.log(' Known user ', req.user.username)
        }
    }
    
    next();
}