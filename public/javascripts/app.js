// module defintion
var module = angular.module('Admin', ['ngRoute', 'ngRoute', 'ngResource']);

module.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    // route definition
    $routeProvider
        .when('/cases/:id', {
            templateUrl: '/templates/case-detail.html',
            controller: 'CaseDetailCtrl'
        })
        .when('/cases', {
            templateUrl: '/templates/case-list.html',
            controller: 'CaseListCtrl'
        })
        .otherwise({
            redirectTo: '/cases'
        });

    //$locationProvider.html5Mode(true);
}]);


// registering REST entities
module.factory('Case', ['$resource',
    function($resource){
        return $resource('api/case/:id', {}, {
            get: {method:'GET', params:{id:'@id'}}
        });
    }]);


// registering controllers
module.controller('MainCtrl', [function(){
}]);

module.controller('CaseListCtrl', ['$scope', 'Case', function($scope, Case){
    $scope.cases = Case.query();
}]);


module.controller('CaseDetailCtrl', ['$scope', '$routeParams','Case', function($scope, $routeParams, Case){
    $scope.item = Case.get({id: $routeParams.id});
}]);


// custom directives

module.directive('map', function() {
    return {
        restict: 'A',
        transclude: false,
        link: function(scope, element, attrs, controller, transcludeFn) {
            var mapOptions = {
                center: new google.maps.LatLng(48.886392, 31.992188),
                zoom: 6
            };
            var firstMarker;
            var map = new google.maps.Map(element[0], mapOptions);

            // Create the search box and link it to the UI element.
            var input = $(attrs.searchInput).get(0);
            //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            var searchBox = new google.maps.places.SearchBox(
                /** @type {HTMLInputElement} */(input));

            // Listen for the event fired when the user selects an item from the
            // pick list. Retrieve the matching places for that item.
            google.maps.event.addListener(searchBox, 'places_changed', function() {
                var places = searchBox.getPlaces();

                if (firstMarker) {
                    firstMarker.setMap(null);
                }

                // For each place, get the icon, place name, and location.
                markers = null;
                var bounds = new google.maps.LatLngBounds();
                if (places.length > 0) {
                    var place = places[0];
                    var image = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    };

                    // Create a marker for each place.
                    firstMarker = new google.maps.Marker({
                        map: map,
                        icon: image,
                        title: place.name,
                        position: place.geometry.location
                    });
                    bounds.extend(place.geometry.location);
                }

                map.fitBounds(bounds);
                map.setZoom(13);
            });

        }
    };
});