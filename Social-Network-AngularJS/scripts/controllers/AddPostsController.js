socialNetworkApp.controller('AddPostsController', function ($scope, $location, notify, authPosts, authData) {

    var headers = authData.getHeaders();

    $scope.addPost = function(params) {
        var userObjectId = authData.getSessionStorage().objectId;
        var createdBy =  {
            __type:"Pointer",
            className:"_User",
            objectId: userObjectId
        };

        params = {
            content: $scope.content,
            createdBy: createdBy
        };
        authPosts.addPost(params, headers)
            .then(function(data) {
                $location.path('/home');
                notify('You`ve added successful post!')
            },function(error) {
                notify({message: error});
            });
    };

});