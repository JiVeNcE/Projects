estateProperty.directive('formatDateTime', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelController) {
            ngModelController.$parsers.push(function(data) {

            });

            ngModelController.$formatters.push(function(data) {
                var date = new Date();
                if(data) {
                    date = new Date(data);
                }
                var year = date.getFullYear();
                var month = date.getMonth() +1;
                var day = date.getDate();
                return day + "/" + month + "/" + year;
            });
        }
    }
});
