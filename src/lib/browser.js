var React = require('react'),
    ReactDOM = require('react-dom'),
    // This is our React component, shared by server and browser thanks to browserify
    MainView = React.createFactory(require('../views/MainView.jsx'));