require('dotenv').config();
const express = require('express');
const app = express();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const File_Model = require('./models/File');
app.use(express.urlencoded({extended:true}))
mongoose.connect(process.env.MONGO_URI);

app.set('view engine','ejs');

app.get('/',(req ,res)=>{
    res.render('index.ejs');
});

// Before Handling Post Request we are going to Upload the Single Submitted file into dest Folder called 'uploads' all is handled by multer. Here in single 'file' is 'name' attr's value in input tag. Through whcich we are fetching the form's submitted data. 
// Multer gives us Prop on req body ie req.file which gives us the exact file we uploaded.
// The File input was handled by multer but the password input is by express so we use req.body to retrieve the data for password.
app.post('/upload',upload.single('file'),async (req,res) => { 
    const FileData = {
        path: req.file.path,
        OrgnName: req.file.originalname,
    }
    // Here password is value of 'name' attr in input tag of password in HTML. 
    if(req.body.password!=null && req.body.password!==""){
        FileData.password = await bcrypt.hash(req.body.password,10);
    }

    const file = await File_Model.create(FileData);
    console.log(file);
    res.render('index',{fileLink: `${req.headers.origin}/file/${file._id}`})
});

// File with specifed ID will start Downloading at this route
app.route('/file/:id').get(handleDownload).post(handleDownload);

const Port = process.env.PORT || 1200;
app.listen(Port ,console.log(`Server Listenting on Port ${Port}...`));

async function handleDownload(req, res){
    console.log(req.body.password);
    const file = await File_Model.findById(req.params.id);

    if(file.password!=null){
        // If user did not enter password
        if(req.body.password == null){
            res.render('password.ejs');
            return;
        }
        // If he did enter password
        if(!await bcrypt.compare(req.body.password, file.password)){
            res.render('password.ejs',{error: true});
            return;
        }
    }

    file.downloadCount++;
    await file.save();
    res.download(file.path,file.OrgnName);
}