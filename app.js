const express = require('express');
const pug = require('pug');
const path = require('path');
const bodyParser = require('body-parser');
const {projects} = require('./data.json');
const app = express();
app.use(bodyParser.urlencoded({ extended: false}));
app.set('view engine', 'pug');                                                  //sets up pug
app.use('/static', express.static('public'));                                   //sets up the static route
app.get("/", function(req, res, next){                                          //sets up the index route
  res.render('index', {projects});
})
app.get("/about", function(req, res, next){                                     //sets up the about route
  res.render('about');
})
app.get("/project/:id", function(req, res, next){                               //sets up the project route with the id parameter
  const pro = parseInt(req.params.id);
  const project = projects[pro];
  if(Number.isInteger(pro) && pro < projects.length && pro >= 0){               //this checks if the project has a valid id
    return res.render('project',{project});
  } else{                                                                       //creates an error if no valid id
    let err = new Error("This project page doesn't exist");
    next(err);
  }
})
app.use(function(req, res, next){                                               //adds a 404 error page
  const err = new Error('Not found')
  next(err);
})
app.use(function(err, req, res, next) {                                         //prints error page
  if (res.headersSent) {
    return next(err);
  }
  res.locals.error = err;
  err.status = 404;
  console.error('Error message:', err.message, ', Error status:', err.status)   //logs the error to the console
  res.status(err.status);
  res.render('error');
});
app.listen(3000, function (){                                                   //app listen
 console.log('The App is listening to port 3000')
})
