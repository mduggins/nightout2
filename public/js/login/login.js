angular.module('NightOut').controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$http'];

function loginCtrl($http){
  var lCtrl = this;
  console.log('this is for the lCtrl.')

  lCtrl.user = {};

  lCtrl.login = function(){
    console.log(lCtrl.user);
    $http.post('/login', lCtrl.user).then(function(response){
      lCtrl.success(response);
    });
    lCtrl.user = null;
  }

  lCtrl.success = function(user){
    location.href = '/dashboard';
    lCtrl.userData = user;
    console.log(lCtrl.userData);
  }
}
