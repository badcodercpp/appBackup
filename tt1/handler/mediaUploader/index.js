'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _head2 = require('lodash/head');

var _head3 = _interopRequireDefault(_head2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _uploader = require('../../db/connection/mongo/auth/uploader');

var _uploader2 = _interopRequireDefault(_uploader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uuidv1 = require('uuid/v1');

var doUploadMedia = function doUploadMedia(req, res) {
    var parsedBody = req.body || {};
    var mediaType = (0, _get3.default)(parsedBody, 'mediaType');
    var media = (0, _get3.default)(parsedBody, [mediaType]);
    var mime = (0, _get3.default)(parsedBody, 'mime');
    var mediId = uuidv1();
    var options = {
        media: media,
        type: mediaType,
        mime: mediaType + '/' + mime,
        mediId: mediId
    };
    (0, _uploader2.default)(options).then(function (data) {
        var respAuth = {
            success: true,
            message: 'Upload successful!',
            data: data
        };
        res.status(200);
        res.send(respAuth);
    }).catch(function (error) {
        var respAuth = {
            success: false,
            message: 'Upload successful!',
            error: error
        };
        res.status(500);
        res.send(respAuth);
    });
};

exports.default = doUploadMedia;