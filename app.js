
const express = require('express'); // Search node_modules for express framework
const app = express(); // instantiate instance of express() as "app"
const ExpressError = require("./expressError"); // import custom made ExpressError
const itemsRoutes = require('./items.js'); // import items routes

app.use(express.json()); // tell Express we want to parse incoming requests with different formats (JSON)
app.use("/items", itemsRoutes) // router object we can define routes on


// 404 HANDLER
app.use(function (request, response, next) {
    return new ExpressError("***Page Not Found***", 404);
});

  
// ERROR HANDLER
app.use((error, request, response, next) => {
    response.status(error.status || 500);
  
    return response.json({
      error: error.message,
    });
});


module.exports = app;