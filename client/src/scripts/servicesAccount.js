(function(angular) {

  angular.module('todo').service('users', function($http) {

    var _createUser = function(data) {
      if (data) {
        return $http.post('/api/users/create', data).then(function(res) {
          return res.data;
        })
      }
    };

    return {
      createUser: _createUser
    }

  });

})(angular);