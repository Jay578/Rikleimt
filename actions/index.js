exports.action = {
  name: 'index',
  version: '1',
  description: 'Action for rendering the index page',
  authenticate: true,
  inputs: {
    SAMLResponse: {}
  },

  run: function(api, connection, next){
    api.controllers.index.render(null, null, connection).then(function(){
      next(connection);
    }).catch(function(e) {
      api.log(e, 'error');
      api.renderResponse(500, 'server experiencing internal issues', connection, next);
    });
  }
};
