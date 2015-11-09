(function(angular) {

  function uiMenu($mdDialog) {

    function showMenu(scope, element, attrs) {
      element.bind("click", function(event) {
        scope.menuOpen(event);
      });
    }
    return {
      restrict: "A",
      scope: {menuOpen: "="},
      link: showMenu
    };


  }

  angular.module("todo").directive("uiMenu", uiMenu);
  uiMenu.$inject = ["$mdDialog"];

})(angular);