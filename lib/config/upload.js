'use strict';

var     upload = require('jquery-file-upload-middleware');

/**
 * Express configuration
 */
module.exports = function(app, upload) {
  upload.configure({
        uploadDir: __dirname + '/public/uploads',
        uploadUrl: '/uploads',
        imageVersions: {
            thumbnail: {
                width: 80,
                height: 80
            }
        }
    });

app.use('/api/file', upload.fileHandler());

};