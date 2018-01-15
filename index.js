const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var jwt = require('jsonwebtoken');

var cert=process.env.PEM;

  // get private key
var token = jwt.sign({ sub:'heroku@56OzeWE7XXLnUutMQeYOGq9ER1489468256214',aud:'https://api.einstein.ai/v2/oauth2/token',exp: Math.floor(Date.now() / 1000) + (60 * 60) }, cert, { algorithm: 'RS256'});
console.log(token);


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.set('port', (process.env.PORT || 5000));


app.get('/', function(request, response) { 
  response.render('pages/index');
});

app.get('/einstein', function(request, response) { 
	response.send(token);
  //response.render('pages/einstein');
});

app.listen(app.get('port'), function() {
  console.log(`Listening on ${ PORT }`)
})
