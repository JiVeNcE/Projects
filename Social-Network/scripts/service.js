'use strict';

var app = app || {};


'use strict';

var app = app || {};

app.service = (function() {

    var Data = (function(){

        function Data (baseUrl, requester){
            this.user = new User(baseUrl, requester);
            this.post = new Post(baseUrl, requester);
        }

        return Data;
    })();

    var credential = (function () {

        function getHeaders() {
            var headers = {
                'X-Parse-Application-Id': 'AheHao8FSqbYhyXt63URZDLRDvwvuywDDZUP2up2',
                'X-Parse-REST-API-Key': 'Aqlm5b0vCgC4SQzyq3SF2xfJw9HrzGmYQh0mGugf'
            };

            var currentUser = getSessionToken();

            if(currentUser) {
                headers['X-Parse-Session-Token'] = currentUser;
            }

            return headers;
        }

        function getSessionToken() {
            var userData = JSON.parse(sessionStorage.getItem('userData'));
            if(userData) {
                return userData.sessionToken;
            }

            return false;
        }

        function getUserName() {
            var currentUser = JSON.parse(sessionStorage.getItem('userData'));
            if(currentUser){
                return currentUser.username;
            }
        }

        function getUserData() {
            return sessionStorage.getItem('userData');
        }

        function setUserData(userData) {
            sessionStorage.setItem('userData', userData);
        }

        function isLogged(){
            var currentUser = getSessionToken();
            if(currentUser) {
                return true;
            }
            return false;
        }

        function deleteUser() {
            sessionStorage.clear();
        }

        return {
            getHeaders: getHeaders,
            isLogged: isLogged,
            getUserName: getUserName,
            getUserData: getUserData,
            setUserData: setUserData,
            deleteUser: deleteUser
        }

    })();


    var User = (function() {

        function User (baseUrl, ajaxRequest) {
            this._baseUrl = baseUrl;
            this._ajaxRequester = ajaxRequest;
        }

        User.prototype.isLogged = function() {

            return credential.isLogged();
        };

        User.prototype.login = function (userData) {
            var url = this._baseUrl + 'login';
            return this._ajaxRequester.get(url, userData, credential.getHeaders())
        };

        User.prototype.register = function(userData) {
            var url = this._baseUrl + 'users';
            return this._ajaxRequester.post(url, JSON.stringify(userData), credential.getHeaders())
        };

        User.prototype.getUserData = function() {
            return JSON.parse(credential.getUserData());
        };

        User.prototype.setUserData = function(userData) {
            credential.setUserData(JSON.stringify(userData));
        };

        User.prototype.logout = function() {
            return credential.deleteUser();
        };

        User.prototype.getById = function(id) {
            var url = this._baseUrl + 'users/' + id;
            return this._ajaxRequester.get(url, null, credential.getHeaders())
        };

        return User;
    })();




    var Post = (function() {

        function Post (baseUrl, ajaxRequest) {
            this._baseUrl = baseUrl;
            this._ajaxRequester = ajaxRequest;
        }

        Post.prototype.getPost = function () {
            var data = {include :'createdBy'}
            var url = this._baseUrl + 'classes/Post';
            return this._ajaxRequester.get(url, data, credential.getHeaders())
        };

        Post.prototype.makePost = function (data) {
            var url = this._baseUrl + 'classes/Post';
            return this._ajaxRequester.post(url, data, credential.getHeaders())
        };

        Post.prototype.editProfile = function (data) {
            var user = credential.getUserData().objectId;
            var url = this._baseUrl + 'users/' + user;
            return this._ajaxRequester.put(url, JSON.stringify(data), credential.getHeaders())
        };

        Post.prototype.loadProfile = function(userData) {
            var user = JSON.parse(credential.getUserData()).objectId;
            var url = this._baseUrl + 'users/' + user;
            return this._ajaxRequester.get(url, JSON.stringify(userData), credential.getHeaders())
        };

        return Post;
    })();


    return {
        data: function(baseUrl, ajaxRequest) {
            return new Data(baseUrl, ajaxRequest);
        }
    }

})();