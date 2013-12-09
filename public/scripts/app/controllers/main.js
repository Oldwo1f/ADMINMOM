
app.controller('mainCtrl',['$scope','$route','$routeParams', '$location' , '$http',
function ($scope, $route, $routeParams, $location, $http ) {

	$scope.user ={};

  	$scope.login = function() {
  		console.log('session');

		$http.get('account/session').success(function(data) {
			if (data.user.username) {
				// succefull login
				$scope.user.isLogged = true;
				$scope.user.username = data.user.username;
			}
			else {
				$scope.user.isLogged = false;
				$scope.user.username = '';
			}
		})
		.error(function(data, status, headers, config) {
			$scope.user.isLogged = false;
			$scope.user.username = '';
		});
	}
	$scope.login();
}]);



