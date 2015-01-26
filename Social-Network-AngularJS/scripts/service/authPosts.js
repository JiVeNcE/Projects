socialNetworkApp.factory('authPosts', function ($http, $q, baseUrl) {

    function getAllPosts (params, headers) {

        var CONST_URL = 'classes/Post?include=createdBy';
        var defer = $q.defer();

        $http({
            method: 'GET',
            url: baseUrl + CONST_URL,
            headers: headers,
            params: params
        })
            .success(function (data) {
            defer.resolve(data);
        })
            .error(function (data) {
            defer.reject(data);
        });

        return defer.promise;
    }
    function getUserPostById (id,headers) {
        var defer = $q.defer();

        $http({
            method: 'GET',
            url: baseUrl + 'users/' + id ,
            headers: headers
        }).success(function (data) {
            defer.resolve(data);
        }).error(function (data) {
            defer.reject(data);
        });

        return defer.promise;
    }
    function addPost (data, headers) {
        var CONST_URL = 'classes/Post';
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: baseUrl + CONST_URL,
            headers: headers,
            data: data
        })
            .success(function (data) {
            defer.resolve(data);
        })
            .error(function (data) {
            defer.reject(data);
        });

        return defer.promise;
    }




    return {
        getAllPosts: getAllPosts,
        addPost: addPost,
        getUserPostById:getUserPostById
    }
});