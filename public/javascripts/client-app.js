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
            get: {method:'GET', params:{id:'@id'}},
            put: {method:'PUT', params:{id:'@id'}},
            delete: {method:'DELETE', params:{id:'@id'}},
            post: {method:'POST'}
        });
    }]);


// registering controllers
module.controller('MainCtrl', [function(){
}]);

module.controller('CaseListCtrl', ['$scope', 'Case', function($scope, Case){
    $scope.cases = Case.query();
}]);


module.controller('CaseDetailCtrl', ['$scope', '$routeParams', '$location', '$q', 'Case',
    function($scope, $routeParams, $location, $q, Case){
        if ($routeParams.id == 'new') {
            $scope.item = {};
            $scope.item.$resolved = true; // this variable is used for show loading on the UI
        } else {
            $scope.item = Case.get({id: $routeParams.id});
        }

        $scope.save = function(item, redirectToNew){
            if (!$scope.detail.$valid) {
                return;
            }

            var saveResult = $q.defer();
            $scope.saving = true;

            if (item.id) {
                Case.put(item, function(data){
                    saveResult.resolve(data);
                });
            } else {
                Case.post(item, function(data){
                    saveResult.resolve(data);
                });
            }
            var lastId = item.id;
            saveResult.promise.then(function(data){
                $scope.saving = false;
                if (redirectToNew) {
                    $scope.item = {};// in case we are on the new already
                    $location.url('/cases/new'); // in case we are not
                } else if (lastId != data.id) {
                    $location.url('/cases/' + data.id);
                }
            })
        };

        $scope.deleteItem = function(item){
            if (window.confirm("Realy want to delete this item?")) {
                item.$delete(function(){
                    $location.url('/cases');
                });
            }
        }
    }]);


// custom directives

module.directive('map', function() {
    return {
        restict: 'A',
        transclude: false,
        scope: {
            lng: '=',
            lat: '=',
            place: '='
        },
        link: function(scope, element, attrs, controller, transcludeFn) {
            var defaultZoom = 17;

            var mapOptions = {
                center: new google.maps.LatLng(48.886392, 31.992188),
                zoom: 6
            };
            var firstMarker;
            var map = new google.maps.Map(element[0], mapOptions);

            var createMarker = function(latLng){
                if (firstMarker !=  null) {
                    firstMarker.setMap(null);
                }
                firstMarker = new google.maps.Marker({
                    map: map,
                    title: 'place',
                    position: latLng
                });

                map.setCenter(latLng);
                map.setZoom(defaultZoom);
            };

            scope.$watch('lng', function(){
                if (scope.lng) {
                    var latLng = new google.maps.LatLng(scope.lat, scope.lng);
                    createMarker(latLng);
                }
            });

            // Create the search box and link it to the UI element.
            var input = $(attrs.searchInput);
            var searchBox = new google.maps.places.SearchBox(input.get(0));

            google.maps.event.addListener(searchBox, 'places_changed', function() {
                var places = searchBox.getPlaces();

                var bounds = new google.maps.LatLngBounds();
                if (places.length > 0) {
                    var place = places[0];
                    createMarker(place.geometry.location);
                    scope.$apply(function(){
                        scope.lat = place.geometry.location.lat();
                        scope.lng = place.geometry.location.lng();
                        scope.place = input.val();
                    });
                }
            });

        }
    };
});