var express = require('express');
var passport = require('passport');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var port = process.env.PORT || 8000;
mongoose.Promise = global.Promise;
var dbCfg = require('./config/dbCfg');
var models = require('./models')
var session = require('express-session');
var passportCfg = require('./config/passportCfg');
var http = require('http');
var path = require('path');
var pm = require('./photomanager');
var MongoStore = require('connect-mongo')(session);

const app = express();

//app.use(express.logger('dev'));
//body parser
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json()); 

app.use(logger('dev'));
app.use(cookieParser());
app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {maxAge: 180 * 60 * 1000}
}));

//app.use(express.methodOverride());
app.use(passport.initialize());
app.use(passport.session());
//app.use(app.router);
app.use(express.static(path.join(__dirname, '../public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * Assign Routes.
 */
/** File upload from user **/
app.post('/upload', pm.uploadPhotoAWS);
/** File C.R.U.D. **/
app.post('/photos', pm.addPhoto);
app.get('/photos', pm.findAllPhotos);
app.get('/photos/:id', pm.findPhotoById);
app.put('/photos/:id', pm.updatePhoto);
app.post('/photos/:id', pm.updatePhoto);
app.delete('/photos/:id', pm.deletePhoto);
/** Album C.R.U.D. **/
app.post('/albums', pm.addAlbum);
app.get('/albums', pm.findAllAlbums);
app.post('/albums/:id/:action/:photoId', pm.editAlbumPhotos)
app.get('/albums/:id', pm.findAlbumById);
app.put('/albums/:id', pm.updateAlbum);
app.post('/albums/:id', pm.updateAlbum);
app.delete('/albums/:id', pm.deleteAlbum);
/** Gallery - returns all photos with album = id **/
app.get('/gallery/:id', pm.findAllPhotosInAlbum);
/** Login to App **/
app.post('/login', passportCfg.postLogin);
app.get('/logout', function(req, res){
	req.logOut(); 
	//res.clearCookie('user');
	res.send(200);
});
app.get('/protected', passportCfg.ensureAuthenticated, function(req, res){res.send('PROTECTED')})
app.get('/isloggedin', function(req, res) {
	res.send(req.isAuthenticated() ? req.user : 0)
});

app.listen(port, () => {
	console.log("App Running on Port: " + port);
});
