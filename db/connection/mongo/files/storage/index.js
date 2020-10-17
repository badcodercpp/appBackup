const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
export const getStorage = () => {
    return GridFsStorage({
        gfs : gfs,
    
        filename: (req, file, cb) => {
            let date = Date.now();
            // The way you want to store your file in database
            cb(null, file.fieldname + '-' + date + '.'); 
        },
        
        // Additional Meta-data that you want to store
        metadata: function(req, file, cb) {
            cb(null, { originalname: file.originalname });
        },
        root: 'bjsFiles' // Root collection name
    });
}