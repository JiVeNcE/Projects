estateProperty.controller('ModalController', function modalController($scope, $q, $rootScope, $route, $modalInstance, propertiesData, id) {
    $scope.id = id;
    $scope.scheduleData = {name: '', time: null, hostId: null, propertyId: id};

    propertiesData.getScheduleProperties(
        id,
        function success(schedulesResponse) {

            $scope.getHostList().then(function (hostsResponse) {
                $scope.hosts = hostsResponse;
                $scope.schedules = schedulesResponse;
            });

        }, function error (err) {
           console.log('Cannot get ad by Id' + err.error_description)
        }
    );

    $scope.getHostList = function () {
        var d = $q.defer();
        propertiesData.getHostsList(
            function success(data) {
                d.resolve(data);
            }, function error (err) {
                console.log('Cannot get ad by Id' + err.error_description)
            }
        );
        return d.promise;

    };

    $scope.deleteSchedule = function(schedule) {
        propertiesData.deleteScheduleById(
            schedule.id,
            function success(data) {
                var index = $scope.schedules.indexOf(schedule);
                $scope.schedules.splice(index, 1);
                console.log(data);
            }, function error (err) {
                console.log('Cannot get ad by Id' + err.error_description)
            }
        );
    };

    $scope.addSchedule = function () {
        if($scope.isValidField().isValid) {
            propertiesData.addScheduleRequest(
                $scope.scheduleData,
                function success(data) {
                    $scope.schedules.push(data);
                    $scope.resetScheduleData();
                }, function error (err) {
                    console.log('Cannot get ad by Id' + err.error_description)
                }
            );
        }else {
            if($scope.isValidField().msgs.length) {
                var message = "";
                $scope.isValidField().msgs.forEach(function (msg) {
                    message+= msg + "\n";
                });
                alert(message);
            }
        }
    };

    $scope.resetScheduleData = function () {
        $scope.scheduleData = {name: '', time: null, hostId: $scope.hosts[0].id, propertyId: id};
    };

    $scope.isValidField = function () {
        var todayDate = new Date(new Date().toDateString());
        var result = {isValid: true, msgs: []};

        if($scope.scheduleData.name.length <= 1) {
            result.isValid = false;
            result.msgs.push("Please fill name field");
        }

        if($scope.scheduleData.time == null || $scope.scheduleData.time <= todayDate){
            result.isValid = false;
            result.msgs.push("Please Choose Date after Today");
        }
        return result;
    };

    $scope.getDisplayValue = function (hostId) {
        return $scope.hosts.filter(function (h) {
            return h.id == hostId;
        })[0].name;
    };

    /* close modal dialog */
    $scope.closeModal = function () {
        $modalInstance.dismiss('cancel');
    };
});