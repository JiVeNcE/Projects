socialNetworkApp.controller('LoginController', function($scope, $location, notify, authData) {
    $scope.userData = authData;
    $scope.login = function(user) {

        authData.login(user)
            .then(function(data) {
                authData.setSessionStorage(data);
                notify('Successful login ' + data.username);
                $location.path('/home');
            }, function(error) {
                notify({
                    message: error
                });
            })
    };

    $scope.isLogged = function() {
        return authData.isLogged();
    };

    $scope.logout = function() {
        authData.logout();
        $location.path('/');

    }
});