var User = require('../models/user'),
    bcrypt = require('bcryptjs');

module.exports = {
  logout: (req, res) => {
    req.session.user = null;
    res.redirect('/');
  },
  signup: (req, res) => {
    var user = new User(req.body);
    user.save((err, user) => {
      if( err ){
        console.log('User not saved:', err)
      }else{
        console.log('User created!');
        req.session.user = user;
        res.json(user);
      }
    });
  },
  login: (req, res) => {
    User.findOne({email: req.body.email }, (err, user) => {
      console.log(user)
      if(err){
        console.log('there was an error', err)
      }
      if(!user){
        console.log('no user found');
      }else{
        bcrypt.compare(req.body.password, user.password, (bcryptErr, matched) => {
          console.log(req.body.password, user.password);
          if(bcryptErr){
            console.log('there was an error', bcryptErr);
          }else if(!matched){
            console.log('Password did not match');
            res.send({
              message: 'Password did not match'
            })
          }else{
            req.session.user = user;
            res.json(user);
          }
        });
      }
    });
  },
  middleware: (req, res, next) => {
    if(req.session.user){
      console.log('User is logged in.');
      next();
    }else{
      res.redirect('/')
    }
  }
}
