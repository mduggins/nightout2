angular.module('NightOut').controller('signupCtrl', signupCtrl);

signupCtrl.$inject = ['$http'];

function signupCtrl($http){
  var suCtrl = this;
  console.log('this is from the signupCtrl.');

  suCtrl.newUser = {};

  suCtrl.create = function(){
    $http.post('/signup', suCtrl.newUser);
    suCtrl.newUser = null;
    location.href = '/';
  }
}
