'use strict';

var app = app || {};

app.controller = (function() {

    function BaseController(data) {
        this._data = data;
    }

    BaseController.prototype.login = function() {

        var self = this;
        var userData = {
            username: $('#login-username').val(),
            password: $('#login-password').val()
        };

        this._data.user.login(userData).then(
            function(data) {
                self._data.user.setUserData(data);
                window.location = '#/user-home';
                console.log('login ok');
            },
            function (error) {
                console.log('login ne e e ok' + error);
                window.location = '#/login';
            })
    };


    BaseController.prototype.register = function() {
        var self = this;

        var userData = {
            username : $('#reg-username').val(),
            password : $('#reg-password').val(),
            name : $('#reg-name').val(),
            about : $('#reg-about').val(),
            gender : $('input[name="gender-radio"]:checked').val(),
            picture : $(".form-group" ).find( "img").attr("src")
        };

        this._data.user.register(userData).then(
            function(data) {
                data.username = userData.username;
                data.picture = userData.picture;
                self._data.user.setUserData(data);
                console.log('register ok');
                window.location = '#/user-home';
            },
            function(error) {
                console.log('register error');
                window.location = '#/register';
            })
    };

    BaseController.prototype.logout = function(selector) {
        console.log('logout ok');
        this._data.user.logout();
        $(selector).html('');
        window.location = '#/'
    };

    BaseController.prototype.loadHeaders = function(selector) {
        var self = this;

        if (this._data.user.isLogged()){
            $.get('templates/header.html', function(view) {
                var currentUser = self._data.user.getUserData();
                var output = Mustache.render(view, currentUser);
                $(selector).html(output);
            })
        }
    };



    BaseController.prototype.makePost = function() {

        var self = this;
        var createdBy = {
            objectId : self._data.user.getUserData().objectId,
            __type:"Pointer",
            className:"_User"
        };
        var postContent = {
            content: $('#post-content').val(),
            createdBy: createdBy
        };

        this._data.post.makePost(JSON.stringify(postContent)).then(
            function(data) {
                console.log('post posted!');
                window.location = '#/user-home'
            },
            function(error) {
                console.log('post not posted!' + error);
            })
    };

    BaseController.prototype.getPost = function(selector) {
        var posts;

        this._data.post.getPost().then(
            function(data) {
                console.log(data);
                $.get('templates/user-home.html', function(view) {
                    var output = Mustache.render(view, data);
                    $(selector).html(output);
                });
                console.log('post take it!');
            },
            function(error) {
                console.log('post not take it!' + error);
            })
    };

    BaseController.prototype.loadProfile = function(selector) {

        this._data.post.loadProfile().then(
            function(data) {
                console.log(data);
                $("#username").attr('value', data.username);
                $("#name").attr('value', data.name);
                $("#about").text(data.about);
                $(".picture-preview").attr('src', data.picture);
                console.log('Profile Loaded!');
            },
            function(error) {
                console.log('Profile cannot load!' + error);
            })
    };

    BaseController.prototype.editProfile = function() {
        var self = this;

        var userData = {
            username : $('#username').val(),
            password : $('#password').val(),
            name : $('#name').val(),
            about : $('#about').val(),
            gender : $('input[name="gender-radio"]:checked').val(),
            picture : $(".form-group" ).find( "img").attr("src")
        };

        this._data.post.editProfile(userData).then(
            function(data) {
                self._data.user.setUserData(data);
                console.log('profile edited');
                window.location = '#/user-home';
            },
            function(error) {
                console.log('profile not edited' + error);
                window.location = '#/edit-profile';
            })
    };

    BaseController.prototype.eventHandler = function() {
        var selector = $('#main');
        attachMouseHoverHandler.call(this, selector);
        attachMouseOutHandler.call(this, selector);
    };

    var attachMouseOutHandler = function(selector) {
        $(selector).on('mouseout', '.profile-link', function(e) {
            var div = $('.pop-pup');

            if(div != undefined) {
                div.remove()
            }
        })
    };

    var attachMouseHoverHandler = function(selector) {
         var self = this;
        $(selector).on('mouseover', '.profile-link', function(e) {
            var div = $('.pop-pup');
            var parent =  $(e.target).parent().parent().parent();

            div = $('<div>').text('LOADING');
            div.addClass('pop-pup');
            parent.append(div);
            var user = $(e.target).data().id;

            $.get('templates/hover-box.html', function(view){
                self._data.user.getById(user).then(
                    function(data) {
                        console.log(data);
                        var output = Mustache.render(view, data);
                        div.html(output);
                    },
                    function(error) {
                    console.log('err' + error);
                })
            });
        })
     };

    return {
        get: function (data) {
            return new BaseController(data);
        }
    }
})();