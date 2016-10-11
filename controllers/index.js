var NotFoundError = require(__dirname + '/../src/util/NotFoundError');
var _ = require('underscore');
var Promise = require('promise');

var controller = {
  indexRender: function(api, connection){
    var viewParams = {};

    return new Promise(function(resolve, reject) {
      api.React.renderMainView('IndexView', viewParams, connection);

      resolve();
    });
  }
};

module.exports = {
  route: 'index',
  render: function(api, action, id, connection) {
    return controller.indexRender(api, connection);
  },
  handle: function(api, action, id, data, connection) {
    throw new NotFoundError('index controller does not support any handling');
  }
};
