var path = require('path'),
    request = require('request'),
    fs = require('fs');

var uncacheAndReloadAllActions = function(api) {
  api.config.general.paths.action.forEach(function(p){
    api.utils.recursiveDirectoryGlob(p).forEach(function(f){
      api.log('uncaching ' + f, 'debug');
      delete require.cache[require.resolve(f)];
      api.actions.loadFile(f, true);
    });
  });
};

module.exports = {
  initialize: function(api, next) {

    if(api.env !== 'development') {
      next();
    } else {
      var path_to_src = path.resolve( __dirname + '/../src/');

      api.utils.recursiveDirectoryGlob(path_to_src).forEach(function(f){
        api.log('setting up watch for ' + f, 'debug');
        api.watchFileAndAct(f, function(){
          api.log('rebooting due to file change: ' + f, 'info');
          delete require.cache[require.resolve(f)];
          uncacheAndReloadAllActions(api);
          api.commands.restart.call(api._self);
        });
      });

      api.utils.recursiveDirectoryGlob(path_to_src, 'jsx').forEach(function(f){
        api.log('setting up watch for ' + f, 'debug');
        api.watchFileAndAct(f, function(){
          api.log('rebooting due to file change: ' + f, 'info');
          delete require.cache[require.resolve(f)];
          uncacheAndReloadAllActions(api);
          api.commands.restart.call(api._self);
        });
      });

      next();
    }
  }
};
