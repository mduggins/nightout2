angular.module("NightOut").controller('singlesCtrl', singlesCtrl);

  singlesCtrl.$inject = ['NgMap','$scope','$http']

  function singlesCtrl(NgMap, $scope, $http){
    console.log('This is from the singlesCtrl')
    var sCtrl = this
    navigator.geolocation.getCurrentPosition(function(position){
      sCtrl.coords = {lat: position.coords.latitude, lng: position.coords.longitude}
      console.log(sCtrl.coords)
    })

    sCtrl.placeTypes = ['restaurant', 'bar', 'night_club']

    sCtrl.placeTypes.forEach(function(placetype){
      NgMap.getMap().then(function(map){
        sCtrl.request = {
          location: sCtrl.coords,
          radius: 8048,
          types: [placetype]
        }
        console.log(sCtrl.request)
        sCtrl.service = new google.maps.places.PlacesService(map)
        sCtrl.service.nearbySearch(sCtrl.request, sCtrl.callback.bind(null,placetype))
        console.log(sCtrl.service)
      })

      sCtrl.callback = function(placetype, results, status){
        console.log(results)
        if(status == google.maps.places.PlacesServiceStatus.OK){
            sCtrl.createmarker(results[Math.floor(Math.random() * results.length)], placetype)
        }
      }
      sCtrl.site = []
      sCtrl.createmarker = function(place, placetype){
        console.log(place)
        $scope.$apply(function(){
          sCtrl.site.push({
            lat:place.geometry.location.lat(),
            lng:place.geometry.location.lng(),
            name:place.name,
            vicinity: place.vicinity,
            icon: place.icon,
            type: placetype
          })
        })
      console.log(sCtrl.site)
    }
  })

  sCtrl.savePlan = function(){
    $http.post('/dashboard/savePlan', sCtrl.site).then(function(response){
      sCtrl.success(response)
    });
  }

  sCtrl.success = function(data){
    location.href = '/dashboard';
    sCtrl.plans = data;
  }

  sCtrl.typeFormat = function(place){
    var format = place.type.split('')
    format[0] = format[0].toUpperCase()
    console.log(format)
    place.type = format.join('')
    return place.type
  }
  window.sCtrl = sCtrl
}
