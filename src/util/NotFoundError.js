function NotFoundError(message) {
  this.name = 'NotFoundError';
  this.message = (message || '');
  this.statusCode = 404;
}
NotFoundError.prototype = Object.create(Error.prototype);
module.exports = NotFoundError;