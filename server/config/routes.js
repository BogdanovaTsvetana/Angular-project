
const authController = require('../controllers/authController.js');     
const homeController = require('../controllers/homeController.js');
const itemController = require('../controllers/itemController.js');        
const conversationsController = require('../controllers/conversationsController.js');


module.exports = (app) => {
    app.use('/user', authController);           
    app.use('/list', itemController);   
    app.use('/conversations', conversationsController);
    app.use('/', homeController);
};