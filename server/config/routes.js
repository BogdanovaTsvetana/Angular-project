const authController = require('../controllers/authController.js');     
const homeController = require('../controllers/homeController.js');
const itemController = require('../controllers/itemController.js');        
const conversationsController = require('../controllers/conversationsController.js');
const commentsController = require('../controllers/commentsController.js')

module.exports = (app) => {
    app.use('/user', authController);           
    app.use('/list', itemController);   
    app.use('/conversations', conversationsController);
    app.use('/comments', commentsController);
    app.use('/', homeController);
};