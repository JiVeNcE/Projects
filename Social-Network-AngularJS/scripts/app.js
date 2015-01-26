'use strict';
var socialNetworkApp = angular.module('socialNetworkApp', ['ngResource', 'ngRoute', 'cgNotify']).
    config(function ($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'templates/guest-home.html'
        });

        $routeProvider.when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'LoginController'
        });

        $routeProvider.when('/register', {
            templateUrl: 'templates/register.html',
            controller: 'RegisterController'
        });

        $routeProvider.when('/home', {
            templateUrl: 'templates/list-all-posts.html',
            controller: 'PostsController'
        });

        $routeProvider.when('/add-post', {
            templateUrl: 'templates/user/add-user-post.html',
            controller: 'AddPostsController'
        });

        $routeProvider.when('/edit-user', {
            templateUrl: 'templates/user/edit-user-profile.html',
            controller: 'EditProfileController'
        });

        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }).constant('baseUrl', 'https://api.parse.com/1/');