const express = require('express');  
const { PORT } = require('./config/index.js');          
const databaseConfig = require('./config/database.js');   
const expressConfig = require('./config/express.js');     
const routesConfig = require('./config/routes.js');        
const storage = require('./middlewares/storage.js');
const logger = require('./middlewares/logger.js');
const conversations = require('./middlewares/conversationsMiddlewares.js');

start(); 

async function start() {

    const app = express(); 
    app.use(logger()); 

    await databaseConfig(app); 
    expressConfig(app); 

    app.use(await storage());
    app.use(await conversations());
    routesConfig(app);
    
    app.listen(PORT, () => {
        console.log(`Application started at http://localhost: ${PORT}`)
    });  
}


 

