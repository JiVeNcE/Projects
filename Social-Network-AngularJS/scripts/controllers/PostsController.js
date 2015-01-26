socialNetworkApp.controller('PostsController', function ($scope, notify, authPosts, authData) {

    var headers = authData.getHeaders();
    $scope.getAllPosts = function (params) {

        authPosts.getAllPosts(params, headers)
            .then(function (data) {
                $scope.allPosts = data;
            }, function (error) {
                notify({message: error});
            });
    };

    $scope.getAllPosts();
    $scope.ready = false;
    $scope.loading = false;
    $scope.userHover = function (id) {

        $scope.loading = true;

        authPosts.getUserPostById(id, headers).then(
            function (data) {
                $scope.userInfo = data;
                $scope.ready = true;
            },
            function (error) {
                notify(error);
            }
        )
    };

    $scope.hoverOut = function () {
        $scope.ready = false;
        $scope.loading = false;
        $scope.userInfo = null;
    }
});