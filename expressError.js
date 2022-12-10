
// ExpressError extend normal JS error so we can easily add a status when we made an instance of it.
// Error handling middleware will return this.

 class ExpressError extends Error {
    constructor(message, status) {
      super();
      this.message = message;
      this.status = status;
      console.error(this.stack);
    }
}
  
  
module.exports = ExpressError;