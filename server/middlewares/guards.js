

function isUser() {             // 2
    return (req, res, next) => {
        if (req.user) {
            console.log('>> in guards, isUser')
           console.log(req.user)
            next();
        } else {
            res.redirect('/user/login');
        }
    }
}

function isGuest() {           // 2
    return (req, res, next) => {
        if ( !req.user ) {
            next();
        } else {
            res.redirect('/');          // TODO change route
        }
    }
}



module.exports = {
    isUser,
    isGuest,
 
}