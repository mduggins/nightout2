var User = require('../models/user'),
    Plan = require('../models/plan'),
    AUTH = require('./session');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index.html');
  });

  app.get('/signup', (req, res) => {
    res.render('signup.html');
  });

  app.get('/logout', AUTH.logout);

  app.post('/signup', AUTH.signup);

  app.post('/login', AUTH.login);

  app.all('/dashboard', AUTH.middleware);
  app.get('/dashboard', (req, res) => {
    res.render('dashboard.html', req.session);
  });
  app.get('/dashboard/singles', (req, res) => {
    res.render('singles.html', req.session);
  });
  app.get('/dashboard/couples', (req, res) => {
    res.render('couples.html', req.session);
  });
  app.post('/dashboard/savePlan', (req, res) => {
    var newPlan = new Plan({userId: req.session.user.email, sites: req.body});
    console.log(newPlan);
    newPlan.save((err, plan) => {
      if(err){
        res.json(err);
      }else{
        res.json(plan);
      }
    });
  });

  app.get('/dashboard/getPlans', (req, res) => {
    Plan.find({userId: req.session.user.email}, (err, plans) => {
      console.log(plans);
      res.json(plans);
    });
  });

  app.delete('/dashboard/deletePlan/:id', (req, res) => {
    Plan.remove({_id: req.params.id}, (err, plan) => {
      if(err){
        console.log(err)
      }else{
        res.json({message: 'Successfully Deleted!'})
      }
    })
  })
}
