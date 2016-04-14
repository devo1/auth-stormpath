var express = require('express');
var stormpath = require('express-stormpath');

var app = express();
app.set('view engine', 'jade');
app.set('views', './views');

app.use('/profile',stormpath.loginRequired,require('./profile')());
app.use(stormpath.init(app, {expand: { customData: true }
}));

app.get('/', stormpath.getUser, function(req, res) {
  res.render('home', { title: 'Welcome'});
});

app.on('stormpath.ready',function(){
  console.log('stormpath Ready');
});

app.listen(3000);