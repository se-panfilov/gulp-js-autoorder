var through         = require('through2');
var path            = require('path');
var gutil           = require('gulp-util');
var header          = require('gulp-header');
var PluginError     = gutil.PluginError;

const PLUGIN_NAME = 'gulp-js-autoorder';
const MESSAGES = {
    STREAMS_NOT_SUPPORTED_ERROR: 'Streams are not supported'
};


function gulpJsAutoOrder(options) {

    var searchPattern = /import[\s+].+=[\s+]?(.+);/g;

    return through.obj(function(file, enc, callback) {

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, MESSAGES.STREAMS_NOT_SUPPORTED_ERROR));
            return callback();
        }

        if (file.isBuffer()) {
            var match;
            var references = [];
            var contents = file.contents.toString();

            while ((match = searchPattern.exec(contents)) !== null) {
                references.unshift(match[1].replace(/\./g, '/') + '.ts')
            }

            references.forEach(function(reference) {
                var relativePath = path.join(
                    path.relative(path.dirname(file.path), path.dirname(path.join(file.base, reference))),
                    path.basename(reference)
                );

                var stream = header('/// <reference path="${path}"/>\n', {path: relativePath});

                stream.once('data', function(newFile) {
                    file.contents = newFile.contents;
                });

                stream.write(file);

            }, this);

        }

        this.push(file);
        callback();
    });
}

module.exports = gulpJsAutoOrder;