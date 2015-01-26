socialNetworkApp.controller('RegisterController', function($scope, $location, notify, $q, authData) {
    $scope.user = {};
    $scope.register = function (user){

        authData.register(user)
            .then(function(data){
                data.username = user.username;
                data.picture = user.picture;
                data.name = user.name;
                console.log(data);
                authData.setSessionStorage(data);
                notify('Successful register ' + data.username);
                $location.path('/home');
            }, function(error){
                notify({message: error});
            })
    };


    $scope.fileSelected = function(fileInputField) {
        var file = fileInputField.files[0];
        if (file.type.match(/image\/.*/)) {
            var reader = new FileReader();
            reader.onload = function() {
                $scope.user.picture = reader.result;
                $(".picture-preview").attr("src",reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            $(".image-box").html("<p>File type not supported!</p>");
        }
    };

});