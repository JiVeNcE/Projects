socialNetworkApp.controller('EditProfileController', function($scope, $location, notify, authData) {
    $scope.userData = authData.getSessionStorage();
    $scope.activeGender = $scope.userData.gender;

    $scope.userSaveProfile = function(userData) {
        userData.gender =  $scope.activeGender;

        authData.editUser(userData).then(
            function(data){
                data.objectId = userData.objectId;
                authData.setSessionStorage(data);
                notify('User Edited succsesfully');
                $location.path('/home')
            },
            function(error){
                console.log('error' + error.err.description)
            }
        )
    };


    $scope.fileSelected = function(fileInputField) {
        var file = fileInputField.files[0];
        if (file.type.match(/image\/.*/)) {
            var reader = new FileReader();
            reader.onload = function() {
                $scope.userData.picture = reader.result;
                $(".picture-preview").attr("src",reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            $(".image-box").html("<p>File type not supported!</p>");
        }
    };
});