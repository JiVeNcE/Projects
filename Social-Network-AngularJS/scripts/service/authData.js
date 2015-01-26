socialNetworkApp.factory('authData', function ($http, $q, baseUrl) {



    function getHeaders() {

        var headers = {
            'X-Parse-Application-Id': 'jLWWrUAXX0cKifF4K8uSaj9mg8sqR6XZToTT1ZY4',
            'X-Parse-REST-API-Key': '7krvNc6zDqQNhcPTBmGPaxaO8x5fboXtxq7icSbg'
        };



        if (isLogged()) {
            var currentUser = getSessionStorage().sessionToken;
            headers['X-Parse-Session-Token'] = currentUser;
        }

        return headers
    }




    function login (user) {

        var defer = $q.defer();

        $http({
            method: 'GET',
            url: baseUrl + 'login',
            headers: getHeaders(),
            params: user
        }).success(function (data) {
            defer.resolve(data);
        }).error(function (data) {
            defer.reject(data);
        });

        return defer.promise;
    }

    function register (user) {

        var defer = $q.defer();

        $http({
            method: 'POST',
            url: baseUrl + 'users',
            headers: getHeaders(),
            data: user
        }).success(function (data) {
            defer.resolve(data);
        }).error(function (data) {
            defer.reject(data);
        });

        return defer.promise;
    }

    function editUser(user) {
        var defer = $q.defer();

        $http({
            method: 'PUT',
            url: baseUrl + 'users/' + user.objectId,
            headers: getHeaders(),
            data:  user
        }).success(function (data) {
            defer.resolve(data);
        }).error(function (data) {
            defer.reject(data);
        });

        return defer.promise;
    }



    function isLogged() {
        var user = getSessionStorage();
        return !!user;
    }
    function setSessionStorage(user){
        sessionStorage.setItem('userData', JSON.stringify(user));
    }

    function getSessionStorage(){
        return JSON.parse(sessionStorage.getItem('userData'));
    }

    function logout() {
        sessionStorage.clear();
    }
    return {
        logout: logout,
        getHeaders: getHeaders,
        setSessionStorage: setSessionStorage,
        getSessionStorage: getSessionStorage,
        login: login,
        register: register,
        isLogged: isLogged,
        editUser: editUser,

    }
});