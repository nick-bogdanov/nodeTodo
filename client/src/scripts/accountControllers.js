(function(angular) {

  function RegisterCtrl($scope, users) {

    this.registerUser = function(form) {

      if (form) {
        var data = {
          userName: $scope.userName,
          userEmail: $scope.userEmail,
          userPass: $scope.userPass
        };

        this.error = null;

        users.createUser(data).then(function(res) {
          console.log(res);
          if (!res.success) {
            $scope.error = res.extras.message;
          }
        });

      }
    }
  }

  function LoginCtrl() {

  }

  angular.module('todo').controller('RegisterController', RegisterCtrl).controller('LoginController', LoginCtrl);

  RegisterCtrl.$inject = ["$scope", "users"];


})(angular);