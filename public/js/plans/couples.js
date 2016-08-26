angular.module("NightOut").controller('couplesCtrl', couplesCtrl)

  couplesCtrl.$inject = ['NgMap','$scope','$http']

  function couplesCtrl(NgMap, $scope, $http){
    console.log('This is from the couplesCtrl')

    navigator.geolocation.getCurrentPosition(function(position){
      cCtrl.coords = {lat: position.coords.latitude, lng: position.coords.longitude}
      console.log(cCtrl.coords)
    })

    var cCtrl = this

    cCtrl.placeTypes = ['restaurant', 'movie_theater', 'park']

    cCtrl.placeTypes.forEach(function(placetype){
      NgMap.getMap().then(function(map){
        cCtrl.request = {
          location: cCtrl.coords,
          radius: 8048,
          types: [placetype]
        }
        console.log(cCtrl.request)
        cCtrl.service = new google.maps.places.PlacesService(map)
        cCtrl.service.nearbySearch(cCtrl.request, cCtrl.callback.bind(null,placetype))
        console.log(cCtrl.service)
      })

      cCtrl.callback = function(placetype, results, status){
        console.log(results)
        if(status == google.maps.places.PlacesServiceStatus.OK){
            cCtrl.createmarker(results[Math.floor(Math.random() * results.length)], placetype)
        }
      }

      cCtrl.site = []
      cCtrl.createmarker = function(place, placetype){
        console.log(place);
        $scope.$apply(function(){
          cCtrl.site.push({
            lat:place.geometry.location.lat(),
            lng:place.geometry.location.lng(),
            name:place.name,
            vicinity: place.vicinity,
            icon: place.icon,
            type: placetype
          });
        });
      }
  });

  cCtrl.savePlan = function(){
    $http.post('/dashboard/savePlan', cCtrl.site).then(function(response){
      cCtrl.success(response)
    });
  }

  cCtrl.success = function(data){
    location.href = '/dashboard';
    cCtrl.plans = data;
  }

  cCtrl.typeFormat = function(place){
    var format = place.type.split('')
    format[0] = format[0].toUpperCase()
    console.log(format)
    place.type = format.join('')
    return place.type
  }
  window.cCtrl = cCtrl
}
