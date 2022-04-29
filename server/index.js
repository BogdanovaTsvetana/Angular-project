
const express = require('express');  // 1
const { PORT } = require('./config/index.js');          // 1
const databaseConfig = require('./config/database.js');   // 2
const expressConfig = require('./config/express.js');     // 3

const routesConfig = require('./config/routes.js');        
const storage = require('./middlewares/storage.js');
const logger = require('./middlewares/logger.js');
const conversations = require('./middlewares/conversationsMiddlewares.js');


start();  // 2

async function start() {

    const app = express();    // 1

    //app.get('/', (req, res) => res.send('It works!'));   // 1

    app.use(logger()); // not in scaffold

    await databaseConfig(app); // await, t.k. vrushta promisse   // 2
    expressConfig(app);   //   3 

    app.use(await storage()); // 
    app.use(await conversations());
    routesConfig(app);
    
    app.listen(PORT, () => {
        
        console.log(`Application started at http://localhost: ${PORT}`)
    });  // 1


}


 

