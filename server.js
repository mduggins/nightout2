var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    path = require('path'),
    ejs = require('ejs'),
    Routes = require('./routes'),
    session = require('client-sessions'),
    PORT = process.env.PORT || 3000,
    ENV = process.env.NODE_ENV || "development",
    app = express();

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended: true}), bodyParser.json());
app.use(morgan('dev'));
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.use(session({
  cookieName: 'nightout-auth',
  secret: 'Sh@ra1da',
  requestKey: 'session',
  duration: 86400,
  cookie: {
    ephemeral: false,
    httpOnly: true,
    secure: false
  }
}));

mongoose.connect('mongodb://localhost/nightout', (err) => {
  if(err){
    console.log('mongo server did not start:', err);
  }else{
    console.log('mongo server started!');
  }
});

Routes(app);

app.listen(PORT, (err) => {
  if(err){
    console.error('Server did not start:', err);
  }
  console.info('Server started!', PORT);
});

if(ENV === "production"){
  var HTTPS = require('https'),
      readFile = require('fs').readFileSync,
      httpsConfig = { // https://nodejs.org/api/https.html
           key:  readFile('/etc/letsencrypt/live/nightout.site/privkey.pem'),
           cert: readFile('/etc/letsencrypt/live/nightout.site/cert.pem')
      }
  HTTPS.createServer( httpsConfig, app ).listen( 443 )
}
