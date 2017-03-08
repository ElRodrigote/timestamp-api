'use strict';

var path = require('path');
var moment = require('moment');
var express = require('express');

var app = express();
var port = process.env.PORT || 8080;

app.get('/', function(req, res) {
  var file = path.join(__dirname, 'index.html');
  res.sendFile(file, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent: ', file);
    }
  });
});

app.get('/:datestring', function(req,res) {
  var myDate;
  //we ask for the parameter's nature: if it is an unix number or date string
  if(/^\d{8,}$/.test(req.params.datestring)) {
    myDate = moment(req.params.datestring, "X"); //parse to UNIX
  } else {
    myDate = moment(req.params.datestring, "MMMM D, YYYY"); //parse to Natural 
  }

  // we set the response json to the formated timestamp or null if it's not a valid moment date
  if(myDate.isValid()) {
    res.json({
      unix: myDate.format("X"),
      natural: myDate.format("MMMM D, YYYY")
    });
  } else {
    res.json({
      unix: null,
      natural: null
    });
  }
});

app.listen(port, function(){
  console.log("Listening to port: " + port);
});