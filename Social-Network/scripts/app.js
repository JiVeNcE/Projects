'use strict';

var app = app || {};

(function() {

    var headerSelector = $('#header');
    var selector = $('#main');
    var baseUrl = 'https://api.parse.com/1/';
    var requester =  app.requester;
    var data = app.service.data(baseUrl, requester );
    var controller = app.controller.get(data);

    controller.eventHandler();

    app.route = Sammy(function() {

        this.get('#/', function () {
            controller.loadHeaders(headerSelector);
            $(selector).load('templates/guest-home.html');
        });

        this.get('#/login', function () {
            controller.loadHeaders(headerSelector);
            $(selector).load('templates/login.html');
        });
        this.get('#/do-login', function () {
            controller.login();
        });
        this.get('#/register', function () {
            controller.loadHeaders(headerSelector);
            $(selector).load('templates/register.html');
        });
        this.get('#/do-register', function () {
            controller.register();
        });
        this.get('#/user-home', function () {
            controller.loadHeaders(headerSelector);
            controller.getPost(selector);

        });
        this.get('#/logout', function () {
            controller.logout(headerSelector);
        });
        this.get('#/edit-profile', function () {
            controller.loadHeaders(headerSelector);
            controller.loadProfile(selector);
            $(selector).load('templates/edit-profile.html');

        });
        this.get('#/do-edit-profile', function () {
            controller.editProfile();
        });
        this.get('#/post', function () {
            controller.loadHeaders(headerSelector);
            $(selector).load('templates/post-box.html');

        });
        this.get('#/add-post', function () {
            controller.makePost();
        });

    }).run('#/');
})();