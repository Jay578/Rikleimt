// A utility function to safely escape JSON for
// embedding in a <script> tag. Taken from here:
// https://github.com/mhart/react-server-example/blob/master/server.js#L96
module.exports.safeStringify = function(obj) {
  return JSON.stringify(obj).replace(/<\/script/g, '<\\/script');
};

module.exports.replaceAll = function(find, replace, str) {
  return str.replace(new RegExp(find, 'g'), replace);
};
