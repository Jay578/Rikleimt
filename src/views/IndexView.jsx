var React = require('react');

var IndexView = module.exports = React.createClass({
  componentDidMount: function() {
    var widgetIframe = document.getElementById('sc-widget'),
        widget       = SC.Widget(widgetIframe);

    widget.bind(SC.Widget.Events.READY, function() {
      // set new volume level
      widget.setVolume(0.3);
    });

    //document.getElementsByTagName('video')[0].onended = function () {
    //  this.load();
    //  this.play();
    //};
  },
  render: function() {
    return  <div className="row">
              <iframe id="sc-widget" style={{display: 'none'}} src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/245481004&amp;auto_play=true"></iframe>
              <script src="https://w.soundcloud.com/player/api.js" type="text/javascript"></script>
              <div className="intro col-md-12 col-sm-12 col-xs-12">
                <div className="first">Maybe life should be about more than just surviving.</div>
                <div className="second">Don't we deserve better than that?</div>
                <div className="third">Maybe we do.</div>
              </div>
              <div className="main col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                  <div className="main-image col-md-12 col-sm-12 col-xs-12">
                    <img src="public/img/rikleimt.png" />
                  </div>
                </div>
                <div className="row">
                  <div className="tagline col-lg-offset-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                    Reborn, Rewritten, Rikleimt
                  </div>
                </div>
                <div className="row">
                  <div className="coming-soon col-lg-offset-4 col-lg-4 col-md-12 col-sm-12 col-xs-12">
                    COMING 2017
                  </div>
                </div>
              </div>
              <div className="col-lg-offset-3 col-lg-6 col-md-12 col-sm-12 col-xs-12 footer">
                <div className="reference col-md-4 col-sm-4 col-xs-12">
                  "Grounder Anthem (Take a Life With Me)" by <a href="https://soundcloud.com/watertowermusic/grounder_anthem_100" target="_blank">Julia Dominczak and Tree Adams</a>
                </div>
                <div className="visit col-md-4 col-sm-4 col-xs-12">
                  Visit Us on <a href="http://clexarikleimt.tumblr.com/" target="_blank">Tumblr</a> | <a href="https://twitter.com/ClexaRikleimt" target="_blank">Twitter</a>
                </div>
                <div className="copyright col-md-4 col-sm-4 col-xs-12">
                  &copy; 2016
                </div>
              </div>
            </div>;
  }
});
