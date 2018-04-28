import _ from "lodash";
const app = angular.module("sautocomplete", []);
app.directive("sautocomplete", function() {
  return {
    restrict: "E",
    scope: {
      data: "=",
      searchProperty: "@"
    },
    link: function(scope, elem, attr) {
      if (scope.data.length < 0) {
        return;
      }

      const defaultValues = _.clone(scope.data);

      const input = elem[0].querySelector("input");

      input.addEventListener("keyup", function(e) {
        // Get Search Value from input;
        const searchTerm = e.currentTarget.value;
        if (!searchTerm) {
          scope.data = defaultValues;
          scope.$apply();
        } else {
          scope.data = _.filter(defaultValues, function(comp) {
            const toCompare = _.get(comp, scope.searchProperty).toLowerCase();
            const compareWith = searchTerm.toLowerCase();
            return _.includes(toCompare, compareWith);
          });
        }
      });
    }
  };
});
