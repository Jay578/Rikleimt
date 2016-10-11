var fs = require('fs'),
    _ = require('underscore');

var walkDir = function(path) {
  var allFiles = fs.readdirSync(path);
  return _.chain(allFiles)
    .map(function(fileOrDir){
      var fullPath = path + '/' + fileOrDir;
      if (fs.lstatSync(fullPath).isDirectory()) {
        return walkDir(fullPath);
      } else {
        return fullPath;
      }
    })
    .flatten()
    .value();
};

module.exports.walkDir = walkDir;