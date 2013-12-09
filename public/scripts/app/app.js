var app = angular.module('adminApp', ['ngRoute'])
 
.config(function($routeProvider) {
  $routeProvider.when('/user', {
    templateUrl: 'account/user',
    controller: 'userCtrl'
  });
  $routeProvider.when('/', {
    controller: 'mainCtrl'
  });
  $routeProvider.when('/project', {
    templateUrl: '/project',
    controller: 'projectCtrl'
  });
  $routeProvider.when('/account/profile', {
    templateUrl: '/account/profile',
    controller: 'profileCtrl'

  });
  $routeProvider.when('/project/edit/:id', {
    templateUrl: '/project/edit',
    controller: 'projectCtrl'

  });
});



