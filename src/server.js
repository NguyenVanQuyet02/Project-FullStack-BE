import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import connectToDB from './config/connectToDB'
require('dotenv').config();


let app = express();
//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


viewEngine(app);
initWebRoutes(app);

connectToDB();
let port = process.env.PORT || 8686;


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})