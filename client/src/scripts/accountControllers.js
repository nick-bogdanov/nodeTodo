(function(angular) {

  angular.module('todo').controller('RegisterController', function($scope, users) {
    $scope.registerUser = function(form) {
      if (form) {
        var data = {
          userName: $scope.userName,
          userEmail: $scope.userEmail,
          userPass: $scope.userPass
        };

        users.createUser(data).then(function(res) {
          console.log(res);
        }).catch(function(err) {
          console.log(err);
        })

      }
    }
  }).controller('LoginController', function() {

  });

})(angular);