(function(angular) {

  angular.module('todo').controller('RegisterController', function($scope, users) {
    $scope.registerUser = function(form) {
      if (form) {
        var data = {
          userName: $scope.userName,
          userEmail: $scope.userEmail,
          userPass: $scope.userPass
        };

        $scope.error = null;

        users.createUser(data).then(function(res) {
          console.log(res);
          if (!res.success) {
            $scope.error = res.extras.message;
          }
        });

      }
    }
  }).controller('LoginController', function() {

  });

})(angular);