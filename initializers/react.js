var path = require('path'),
    React = require('react'),
    ReactDOMServer = require('react-dom/server');

    require('node-jsx').install({
      extension: '.jsx',
      harmony: true
    }); // don't do this in prod.

    module.exports = {
      initialize: function(api, next) {
        var templatePath = path.normalize(api.config.React.templatePath);
        api.React = {
          render: function(fileName, params, connection) {
            var filePath = templatePath + "/" + fileName;
            try {
              var view = React.createFactory(require(filePath));
              var html = ReactDOMServer.renderToString(view(params));
              connection.rawConnection.responseHeaders.push(["Content-Type", "text/html; charset=utf-8"]);
              connection.response = "<div id='container'>" + html + "</div>";
            } catch(e) {
              throw e;
            }
          },

          renderMainView: function(templateName, params, connection) {
            var that = this;
            var mainViewParams = {
              templatePath: api.config.React.templatePath + '/' + templateName + '.jsx',
              params: params
            };

            var mainViewPath = 'MainView.jsx';

            try {
              that.render(mainViewPath, mainViewParams, connection);
              connection.response = "<link rel='stylesheet' href='/public/css/vendor.css'>" +
                "<link rel='stylesheet' href='/public/css/app.css'>" +
                  connection.response +
                    "<script src='/public/js/vendor.js'></script>" +
                      "<script src='/public/js/app.js'></script>";
            } catch(e) {
              if (e.stack) {
                e.stack.split('\n').map(function(error) {
                  api.log(error, 'error');
                });
              } else {
                api.log(e, 'error');
              }
              connection.rawConnection.responseHttpCode = 500;
              connection.response = { error: 'An unexpected error ocurred' };
            }
          }
        };
        next();
      }
    };
