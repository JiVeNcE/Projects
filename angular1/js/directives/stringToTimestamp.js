estateProperty.directive('stringToTimestamp', function() {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(value) {
                return Date.parse(value);
            });
        }
    };
});
