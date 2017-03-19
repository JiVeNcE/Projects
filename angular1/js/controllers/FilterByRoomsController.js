estateProperty.controller('FilterByRoomsController', function($scope, $rootScope) {
    $scope.roomsSelectionChanged = function() {
        var roomSearchValue = parseInt($scope.filterRooms);
        $rootScope.$broadcast("roomsSelectionChanged", roomSearchValue);
    };
});