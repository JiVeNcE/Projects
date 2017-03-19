estateProperty.controller('FilterByAddressController', function($scope, $rootScope) {
    $scope.addressSearchQuery = function() {
        var addressSearchQuery = $scope.address_query;
        $rootScope.$broadcast("addressSearchQuery", addressSearchQuery);
    };
});