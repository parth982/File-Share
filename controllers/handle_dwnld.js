const bcrypt = require('bcrypt');
const File_Model = require('../models/File');

const handleDownload = async (req, res) => {
    console.log(req.body.password);
    const file = await File_Model.findById(req.params.id);

    if (file.password != null) {
        // If user did not enter password
        if (req.body.password == null) {
            res.render('password.ejs');
            return;
        }
        // If he did enter password
        if (!await bcrypt.compare(req.body.password, file.password)) {
            res.render('password.ejs', { error: true });
            return;
        }
    }

    file.downloadCount++;
    await file.save();
    res.download(file.path, file.OrgnName);
};

module.exports = handleDownload;