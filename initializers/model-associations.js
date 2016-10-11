module.exports = {
  startPriority: 1500,
  start: function(api, next){
    var models = Object.keys(api.models);
    models.forEach(function(model) {
      if(api.models[model].defineRelationship) {
        api.models[model].defineRelationship(api);
      }
    });

    next();
  }
};
