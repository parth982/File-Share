require('dotenv').config();
const express = require('express');
const app = express();

const connectDB = require('./Database/connectDB');
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs');

const router = require('./routes/url_routes');
app.use('/',router);

const Port = process.env.PORT || 1200;
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('Database Connected to Backend');
        app.listen(Port ,console.log(`Server Listenting on Port ${Port}...`));
    } catch(err){console.log(err);}
};
start();
