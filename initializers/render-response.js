/*  Wrapper for the ah-handlebars-render-plugin's render helper,
    to render the templates within the main container */

module.exports = {
  initialize: function(api, next) {

    api.renderResponse = function(code, message, connection, next) {
      connection.rawConnection.responseHttpCode = code;
      connection.response.message = message;
      next(connection, true);
    };

    next();
  }
};