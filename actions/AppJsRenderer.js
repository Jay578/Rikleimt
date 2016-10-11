//TODO: DO NOT USE IN PRODUCTION. USE REACT-TOOLS TO PRECOMPILE.
//src: https://github.com/juanmac/react-jsx-server-side/blob/master/server.js

var fs = require('fs'),
    path = require('path'),
    _ = require('underscore');

var browserify = require('browserify'),
    babelify = require('babelify');

var walkDir = require('../src/lib/walk-dir').walkDir;

exports.action = {
  name: 'AppJsRenderer',
  version: '1',
  description: 'Action for rendering the AppJS javascript',
  inputs: {
    SAMLResponse: {},
  },

  run: function(api, connection, next){
    var bowserifyChain = browserify()
      .add( __dirname + '/../src/lib/browser.js')
      .exclude('path'); //path should never be used on client-side

    var allTemplates = walkDir( __dirname + '/../src/views');

    allTemplates.forEach(function(templatePath){
      var templateName = path.relative(api.config.React.templatePath, templatePath).replace('.jsx', '');
      bowserifyChain.require(templatePath, {expose: templateName});
    });

    bowserifyChain.transform(babelify, {presets: ['es2015', 'react']})
      .bundle(function(err, buf){

        connection.rawConnection.responseHeaders.push(["Content-Type", "application/javascript; charset=utf-8"]);
        connection.response = buf.toString();
        next(connection, true);
      });

  }

};
