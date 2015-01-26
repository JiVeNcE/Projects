'use strict';

var app = app || {};

app.requester = (function() {

    function makeRequest( url, method, data, headers) {
        var deferred  = new Q.defer();
        $.ajax({
            url: url,
            method: method,
            contentType:'application/json',
            data :data,
            headers: headers,
            success: function (data){
                deferred.resolve(data);
            },
            error: function (error) {
                deferred.reject(error);
            }
        });

        return deferred.promise;
    }

    function makeGetRequest(url, data, headers) {
        return makeRequest(url, 'GET', data, headers)
    }

    function makePostRequest(url, data, headers) {
        return makeRequest(url, 'POST', data, headers)
    }

    function makePutRequest(url, data, headers) {
        return makeRequest(url, 'PUT', data,  headers)
    }

    function makeDeleteRequest(url, headers) {
        return makeRequest(url, 'DELETE', null, headers)
    }

    return {
        get: makeGetRequest,
        post:makePostRequest,
        put: makePutRequest,
        delete: makeDeleteRequest
    }
})();