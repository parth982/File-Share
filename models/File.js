const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    OrgnName: {
        type: String,
        required: true
    },
    password: String,
    downloadCount: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('File_Colln',Schema);