'use strict';

var path = require('path');
var moment = require('moment');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.resolve(__dirname, 'client')));
app.get('/:timestamp', (req,res) => {
  var time = moment(req.params.timestamp, 'MMMM DD, YYYY', true);
  if (!time.isValid())
    time = moment.unix(req.params.timestamp);
  
  if (!time.isValid()) {
    res.json({
      'humanReadable': null,
      'unix': null
    });
  }
  
  res.json({
    'humanReadable': time.format('MMMM DD, YYYY'),
    'unix': time.format('X')
  });
});

app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});