var path = require('path');
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.config');
var app = express();
var compiler = webpack(config);
var session = require('express-session');
var bodyParser = require('body-parser');
//var db = require('./models');
var MongoStore = require("connect-mongo")(session); 

// APIs 
var mongoose = require("mongoose");
var url = "mongodb://"+process.env.TENNIS_USERNAME + ":"+ process.env.TENNIS_PASSWORD + "@ds153652.mlab.com:53652/tennis";
mongoose.connect(url);

var db = mongoose.connection; 
db.on("error", console.error.bind(console, "# MongoDB - Connection Error: "));
// setup sessions 

app.use(session({
  secret: "robots",
  saveUninitialized: false, 
  resave: false,
  store: new MongoStore({mongooseConnection: db, ttl: 2*24*60*60 })
  // ttl ---> time to leave 2 days * 24 hrs * 60 min & 60 sec 
  // eCommerce 2-4 weeks 
}));

var Courts = require("./models/courts.js");

app.get("/courts", function(req,res){
  Courts.find(function(err, courts){
    if(err){
      console.log("error getting courts ", err); 
    }
    res.json(courts); 
  });
});

// create idea of logged in user 
app.use("/", function (req, res, next) {

  req.login = function (user) {
    req.session.userId = user._id;
    req.session.username = user.email;
    req.session.save();  
  };

  req.currentUser = function (cb) {
     db.User.
      findOne({
          _id: req.session.userId
      },
      function (err, user) {
        req.user = user;
        cb(null, user);
      });
  };

  req.logout = function () {
  	req.session.destroy();
  }
  next(); 
});

app.use(require('webpack-dev-middleware')(compiler, {publicPath: config.output.publicPath}));
app.use(require('webpack-hot-middleware')(compiler));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/session', function(req, res){
	req.currentUser(function(err, user){
    if(user){
      res.send(user);  
    }else{
      res.send(err);
    }
	}); 
});

// app.post('/signup', function(req, res){
// 	var info = req.body; 
// 	db.User.find({username: info.username}, function(err,user){
// 		if(user.length === 0){
// 			db.User.createSecure(info.username, info.password, info.id, info.passphrase, info.address, function(err, user){
//         if(user){
//           res.send(user);
//         }else{
//           res.send(err);
//         }
// 			});	
// 		}else{
//       res.send("Error: username already taken");
//     }
// 	});
// });

// app.post('/login', function(req, res){
// 	var user = req.body;
//   console.log("login user ", user); 
// 	db.User.authenticate(user.username, user.password, function(err, user){
//     if(user){
//       console.log("valid user")
//       req.login(user);
//       res.send(user);  
//     }else{
//       res.send(err);
//     }
// 	});
// });


app.get('/logout', function(req, res){
	req.logout(); 
	res.send('logout finished');
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 3000, function(err) {
  if (err) {
    return console.error(err);
  }
  console.log('Listening at http://localhost:3000/');
});
