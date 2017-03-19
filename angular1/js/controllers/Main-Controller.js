estateProperty.controller('MainController', function($scope, $filter,$timeout, $rootScope, propertiesData, $modal) {

    $rootScope.pageTitle = "Home";
    $scope.loading = true;
    $scope.rooms_filter = false;
    $scope.address_filter = false;

    $scope.reloadProperties = function() {
        propertiesData.getProperties(
            function success(data) {
                $scope.properties = data;
                window.scrollTo(0, 0);
                $scope.loading = false;
            },
            function error(err) {
                console.log("Cannot load ads" + err.error_description)
            }
        );
    };

    $scope.openModal = function(id, action) {
        var modalInstance = $modal.open({
            templateUrl: './templates/layout/schedule-modal.html',
            controller: 'ModalController',
            backdrop: false,
            keyboard: false,
            resolve: {
                id: function() {
                    return id;
                },
                action: function() {
                    return action;
                }
            }
        });
    };

    $scope.filterProperties = function (item) {

        if($scope.rooms_filter) {
            return item.rooms  === $scope.rooms_filter;
        }
        //
        // if($scope.address_filter) {
        //     return item.address.toLowerCase().indexOf($scope.address_filter.toLowerCase()) != -1 ;
        //
        // }
        return "undefined";
    };

    $scope.filterProperties2= function (item) {

        // if($scope.rooms_filter) {
        //     return item.rooms  === $scope.rooms_filter;
        // }

        if($scope.address_filter) {
            return item.address.toLowerCase().indexOf($scope.address_filter.toLowerCase()) != -1 ;

        }
        return "undefined";
    };

    $scope.$on("roomsSelectionChanged", function(event, selectedRoomsValue) {
        $scope.rooms_filter = selectedRoomsValue;
    });

    $scope.$on("addressSearchQuery", function(event, addressSearchQuery) {
        $scope.address_filter = addressSearchQuery;
    });

    $scope.reloadProperties();
});