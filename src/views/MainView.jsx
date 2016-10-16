var React = require('react');

var safeStringify = require('../lib/string-helpers.js').safeStringify;

var MainView = module.exports = React.createClass({
  getInitialState: function() {

    var templatePath = this.props.templatePath;

    //this is intended to never load on the client-side
    if (typeof window === 'undefined') {
      var path = require('path');
      templatePath = path.relative(__dirname, this.props.templatePath).replace('.jsx', '');
    }

    //to scrub out templatePath
    return {
      templatePath: templatePath,
      params: this.props.params
    };
  },
  componentDidMount: function(){
  },
  render: function() {
    var MainContent = React.createFactory(require(this.props.templatePath)); //refactor path

    return  <div>
                <script type="application/json"
                  id="stateStore"
                  dangerouslySetInnerHTML={{__html: safeStringify(this.state)}}>
                </script>

                  <div className="col-md-12 col-sm-12 col-xs-12">
                    {React.createElement(MainContent, this.props.params)}
                  </div>
            </div>;
  }
});

if (typeof window !== 'undefined') {
  var ReactDOM = require('react-dom');
  var injectTapEventPlugin = require("react-tap-event-plugin");
  injectTapEventPlugin();

  var container = document.getElementById("container");
  var state = JSON.parse(document.getElementById("stateStore").innerHTML);
  ReactDOM.render(React.createElement(MainView, state), container);
}
