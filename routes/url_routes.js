const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});

const upload_logic = require('../controllers/upload.js');
const handleDownload = require('../controllers/handle_dwnld.js')

router.route('/').get((req,res)=>{res.render('index.ejs');});
router.route('/upload').post(upload.single('file'),upload_logic);
// File with specifed ID will start Downloading at this route
router.route('/file/:id').get(handleDownload).post(handleDownload);

module.exports = router;