const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.set('port', (process.env.PORT || 5000));


app.get('/', function(request, response) { 
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log(`Listening on ${ PORT }`)
})
