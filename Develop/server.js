// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality

const express = require('express');
// const apiroutes= require('./route/apiroutes');
const htmlroutes = require('./route/htmlroute');
// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server

// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 3001;
// app.use(app.router);
// routes.initialize(app);
// Sets up the Express app to handle data parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
app.use('/', htmlroutes);
// app.use('/apiroutes', apiroutes);
// require('./Develop/route/apiroutes')(app);
// require('./Develop/route/htmlroutes')(app);

// LISTENER
// The below code effectively "starts" our server

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});