var React = require('react');

var IndexView = module.exports = React.createClass({
  render: function() {
    return  <div className="row">
              <iframe style={{display: 'none'}} src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/247716583&amp;auto_play=true"></iframe>
              <video controls autoPlay muted poster="public/img/tower_promo.png" className="bgvid">
                  <source src="public/img/tower_promo.mp4" type="video/mp4" />
              </video>
              <div className="intro col-md-12 col-sm-12 col-xs-12">
                <div className="first">Maybe life should be about more than just surviving.</div>
                <div className="second">Don't we deserve better than that?</div>
                <div className="third">Maybe we do.</div>
              </div>
              <div className="main col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                  <div className="main-image col-md-offset-4 col-sm-offset-4 col-xs-offset-4 col-md-4 col-sm-4 col-xs-4">
                    <img src="public/img/rikleimt.png" />
                  </div>
                </div>
                <div className="row">
                  <div className="tagline col-md-offset-4 col-sm-offset-4 col-xs-offset-4 col-md-4 col-sm-4 col-xs-4">
                    Reborn, Rewritten, Rikleimt
                  </div>
                </div>
                <div className="row">
                  <div className="coming-soon col-md-offset-4 col-sm-offset-4 col-xs-offset-4 col-md-4 col-sm-4 col-xs-4">
                    COMING 2017
                  </div>
                </div>
              </div>
              <div className="col-md-offset-3 col-sm-offset-3 col-xs-offset-3 col-md-6 col-sm-6 col-xs-6 footer">
                <div className="reference col-md-4 col-sm-4 col-xs-4">
                  "Clexa Theme" by <a href="https://soundcloud.com/tree-adams/huns3-clexa-theme" target="_blank">Tree Adams</a>
                </div>
                <div className="visit col-md-4 col-sm-4 col-xs-4">
                  Visit Us on <a href="http://clexarikleimt.tumblr.com/" target="_blank">Tumblr</a> | <a href="https://twitter.com/ClexaRikleimt" target="_blank">Twitter</a>
                </div>
                <div className="copyright col-md-4 col-sm-4 col-xs-4">
                  &copy; 2016
                </div>
              </div>
            </div>;
  }
});
