var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    SALTY_BITS = 10;

var UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  // plans: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'Plan'
  // }
});

UserSchema.pre('save', function(next){
  var user = this;

  if(!user.isModified('password')){
    return next();
  }

  bcrypt.genSalt(SALTY_BITS, (saltErr, salt) => {
    if(saltErr){
      return next(saltErr);
    }
    console.log('Salt created:', salt);

    bcrypt.hash(user.password, salt, (hashErr, hashedPassword) => {
      if(hashErr){
        return next(hashErr);
      }
      user.password = hashedPassword;
      next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
