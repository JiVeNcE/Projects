var estateProperty = angular.module('estatePropertyModule',
    [
        'ngRoute',
        'ngResource',
        'ui.bootstrap',
        'ui.bootstrap.transition',
        'ui.bootstrap.datetimepicker',
        'angular-loading-bar'
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
    .run(function ($rootScope) {
});
