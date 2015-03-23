/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ngBoilerplate.home', [
  'ui.router',
  'plusOne',
  'leaflet-directive',
  'ngFx'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(["$stateProvider", function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/home',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    },
    data:{ pageTitle: 'EventHeat' }
  });
}])

/**
 * And of course we define a controller for our route.
 */
.controller( 'HomeCtrl', ["$scope", "$http", function HomeController($scope, $http) {

  $scope.dataReady = false;
  $scope.loading = false;
  $scope.searched = false;

  parseData = function(eventsJson){
    //use first event to get a rough center
    var lat = eventsJson[0].venue.latitude;
    var lng = eventsJson[0].venue.longitude;
    angular.extend($scope, {
      center: {
        lat: parseFloat(lat), //api returns string
        lng: parseFloat(lng),
        zoom: 13
      }
    });
    var currEvent;
    var currTooltip;
    var currLat;
    var currLng;
    var currLatLng;
    $scope.heatCoords = [];
    $scope.tooltips = [];
    for (i = 0; i < eventsJson.length; i++){
      currEvent = eventsJson[i];
      currLat = parseFloat(currEvent.venue.latitude);
      currLng = parseFloat(currEvent.venue.longitude);
      currLatLng = L.latLng(currLat, currLng);

      $scope.heatCoords.push(currLatLng);
      currTooltip = L.marker(currLatLng, {tooltip: { html: currEvent.name.text}});
      $scope.tooltips.push(currTooltip);
    }

    $scope.dataReady = true;
    $scope.loading = false;
  };

  $scope.getEventbrite = function(){
    baseUrl = 'https://www.eventbriteapi.com/v3/events/search/?token=Y6PXX6MUYLNUCVKKDAIJ'; //hollaaa. Disclaimer - i frown upon unprofessional comments
    $scope.searched = true;
    $http.get(baseUrl + '&venue.city=' +  $scope.location + '&popular=on').
      success(function(data, status, headers, config) {
        console.log(data);
        parseData(data.events);
      }).
      error(function(data, status, headers, config) {

      });
  };

  $scope.$on('bounce-down:enter', function(){
    $scope.loading = true;
  });

}])

.controller( 'MapCtrl', ['$scope', 'leafletData',
    
    function($scope, leafletData) {

      $scope.pinsVisible = false;

      angular.extend($scope, {
        defaults: {
            tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
            maxZoom: 16
        }
      });

      leafletData.getMap().then(function(map) {
        //add heatmap
        L.heatLayer($scope.heatCoords, {radius: 50}).addTo(map);
        //add all tooltips
        for(i = 0; i < $scope.tooltips.length; i++){
          $scope.tooltips[i].addTo(map);
        }
        $scope.hidePins();
      });

      $scope.hidePins = function() {
        var pins = document.getElementsByClassName("leaflet-marker-icon");
        var shadows = document.getElementsByClassName("leaflet-marker-shadow");
        for (var i = 0; i < pins.length; i ++) {
          pins[i].style.visibility = 'hidden';
        }
        for (var j = 0; j < shadows.length; j ++) {
          shadows[j].style.visibility = 'hidden';
        }
        $scope.pinsVisible = false;
      };

      $scope.showPins = function() {
        var pins = document.getElementsByClassName("leaflet-marker-icon");
        var shadows = document.getElementsByClassName("leaflet-marker-shadow");
        for (var i = 0; i < pins.length; i ++) {
          pins[i].style.visibility = 'visible';
        }
        for (var j = 0; j < shadows.length; j ++) {
          shadows[j].style.visibility = 'visible';
        }
        $scope.pinsVisible = true;
      };
}]);

