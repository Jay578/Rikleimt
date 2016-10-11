var React = require('react');

var IndexView = module.exports = React.createClass({
  render: function() {
    return  <div className="row">
              <iframe style={{display: 'none'}} src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/247716583&amp;auto_play=true"></iframe>
              <div className="intro col-md-12 col-sm-12 col-xs-12">
                <div className="first">Maybe life should be about more than just surviving.</div>
                <div className="second">Don't we deserve better than that?</div>
                <div className="third">Maybe we do.</div>
              </div>
              <div className="main col-md-12 col-sm-12 col-xs-12">
                <div className="main-image">
                </div>
                <div className="coming-soon">
                  COMING SOON
                </div>
              </div>
            </div>;
  }
});
