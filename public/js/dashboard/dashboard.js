angular.module('NightOut').controller('dashCtrl', dashCtrl);

dashCtrl.$inject = ['$http']

function dashCtrl($http){
  var dCtrl = this;
  console.log('this is from the dCtrl');

  dCtrl.getPlans = function(){
    $http.get('/dashboard/getPlans').then(function(response){
      dCtrl.plans = response.data;
      if(!dCtrl.plans){
        console.log('There are no saved plans!');
      }
    });
  }
  dCtrl.getPlans();

  dCtrl.remove = function(plan){
    var param = plan;
    $http.delete(`/dashboard/deletePlan/${param}`).then(function(response){
      dCtrl.getPlans();
    });
  }

  dCtrl.typeFormat = function(place){
    var format = place.type.split('')
    format[0] = format[0].toUpperCase()
    console.log(format)
    place.type = format.join('')
    return place.type
  }
}
