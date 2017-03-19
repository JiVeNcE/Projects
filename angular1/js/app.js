
var estateProperty = angular.module('adsModule',
    [
        'ngRoute',
        'cgNotify',
        'ngResource',
        'ui.bootstrap',
        'ui.bootstrap.transition',
        'ui.bootstrap.datetimepicker',
        'angular-loading-bar',
        'ngCookies'
    ]);

estateProperty.config(function ($routeProvider) {
        $routeProvider.when('/', {
            title: 'Properties - Home',
            templateUrl: 'templates/Home.html',
            controller: 'MainController'
        });
        $routeProvider.otherwise(
            { redirectTo: '/' }
        );
    })
    .constant('baseUrl', 'http://localhost:3000/')
    .constant('pageSize', 5)
    .run(function ($rootScope) {
    });
