var fs = require('fs');
var path = require('path');

var controllersPath = __dirname + '/../controllers/';

module.exports = {
  initialize: function(api, next){
    api.controllers = {};

    var controllerFiles = fs.readdirSync(controllersPath);

    controllerFiles.forEach(function(fileName){
      fileName = path.basename(fileName, '.js');

      var controllerDefinition = require(controllersPath + fileName);

      //validate that all the required functions are there
      var requiredAttribute = ['route', 'render', 'handle'];
      requiredAttribute.forEach(function(attr){
        if(!controllerDefinition.hasOwnProperty(attr)) {
          throw new Error(fileName + ' controller needs a \'' + attr + '\' attribute');
        }  
      });

      //
      //  wrap the controller definitions in a confined interface, such that
      //  there MUST and WILL be a `render` function and a `handle` function
      //
      //  also prepend "api" to the render and handle calls, so 
      //  the callers only need to pass in the remaining args
      //
      api.controllers[controllerDefinition.route] = {
        render: controllerDefinition.render.bind(controllerDefinition, api),
        handle: controllerDefinition.handle.bind(controllerDefinition, api)
      };
    });

    next();
  }
};
