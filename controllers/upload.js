const bcrypt = require('bcrypt');
const File_Model = require('../models/File');

const upload_logic = async (req,res) => { 
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
};

module.exports = upload_logic;

// Before Handling Post Request we are going to Upload the Single Submitted file into dest Folder called 'uploads' all is handled by multer. 
// Here in single 'file' is 'name' attr's value in input tag. Through whcich we are fetching the form's submitted data. 
// Multer gives us Prop on req body ie req.file which gives us the exact file we uploaded.
// The File input was handled by multer but the password input is by express so we use req.body to retrieve the data for password.