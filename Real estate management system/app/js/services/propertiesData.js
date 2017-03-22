'use strict';

estateProperty.factory('propertiesData', function($http, baseUrl) {
    return {
        getProperties: function (success, error) {
            var request = {
                method: 'GET',
                url: baseUrl + 'properties'
            };
            $http(request).success(success).error(error);
        },
        getScheduleProperties: function (id, success, error) {
            var request = {
                method: 'GET',
                url: baseUrl + 'scheduleProperties?propertyId=' + id
            };
            $http(request).success(success).error(error);
        },
        getHostsList: function (success, error) {
            var request = {
                method: 'GET',
                url: baseUrl + 'hosts'
            };
            $http(request).success(success).error(error);
        },
        deleteScheduleById: function (id, success, error) {
            var request = {
                method: 'DELETE',
                url: baseUrl + 'scheduleProperties/' + id
            };
            $http(request).success(success).error(error);
        },
        addScheduleRequest: function (data, success, error) {
            var request = {
                method: 'POST',
                data: data,
                url: baseUrl + 'scheduleProperties/'
            };
            $http(request).success(success).error(error);
        }
    }
});
