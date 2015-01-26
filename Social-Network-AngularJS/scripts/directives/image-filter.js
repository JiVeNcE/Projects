socialNetworkApp.filter('searchImage', function() {
    return function(input) {
        if(typeof(input) == 'undefined' || (!input)) {
            return "./imgs/no_image.jpg";
        }else {
            return input;
        }
    }
})