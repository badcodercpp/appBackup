'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
var getStorage = exports.getStorage = function getStorage() {
    return GridFsStorage({
        gfs: gfs,

        filename: function filename(req, file, cb) {
            var date = Date.now();
            // The way you want to store your file in database
            cb(null, file.fieldname + '-' + date + '.');
        },

        // Additional Meta-data that you want to store
        metadata: function metadata(req, file, cb) {
            cb(null, { originalname: file.originalname });
        },
        root: 'bjsFiles' // Root collection name
    });
};