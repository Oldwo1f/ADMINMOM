alert('');
var app = angular.module('adminApp', ['ngRoute'])
 
.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/user', {
    templateUrl: 'templates/user.html',
    controller: userCtrl
    // ,
    // resolve: {
    //   // I will cause a 1 second delay
    //   delay: function($q, $timeout) {
    //     var delay = $q.defer();
    //     $timeout(delay.resolve, 1000);
    //     return delay.promise;
    //   }
    // }
  });
  $routeProvider.when('/', {
    templateUrl: 'templates/dashboard.html',
    controller: dashboardCtrl
  });
 
  // configure html5 to get links working on jsfiddle
  // $locationProvider.html5Mode(true);
});


function MainCtrl($scope, $route, $routeParams, $location) {
  
}





function userCtrl($scope, filterFilter, $http, $timeout){

	$scope.chargementTerminer= false;
	$scope.disableOptions= false;
	$scope.lightboxAddUser= false;
	
	$scope.users=[];
	$scope.$watch('users',function  () {
		$scope.nbChecked = filterFilter($scope.users,{selected : true}).length;
		$scope.allchecked = ($scope.nbChecked == $scope.users.length);
		$scope.disableOptions = !$scope.nbChecked;
		$scope.nbUsers= $scope.users.length;


	},true)
	$http.get('user/getAllUsers').success(function(datas) {
		$scope.users = datas;
		$scope.chargementTerminer= true;
	});
	
	$scope.checkAll = function(allchecked) {

	};
	$scope.checkAll=function(allchecked) {
		allchecked = !allchecked;
		$scope.users.forEach(function(user) {
			user.selected = allchecked;
		});
	};
	$scope.addUser=function() {

		var user = {};
		user.login = this.newUserInputLogin
		user.email = this.newUserInputEmail
		user.password = this.newUserInputPassword
		

		$http.post('/user/addUser',user).success(function(datas, status) {
		    	

		    console.log('sauvegarder')
		    
		    if(!datas.success)
		    {
		    	console.log(datas.errors);
		    	for(error in datas.errors) {
					console.log(datas.errors[error]);
					console.log(error);
					$('.form-group[rel="'+error+'"]').addClass('has-error');
					$('.handleErrors').append('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'
					+ datas.errors[error][0] +
					'</div>')
				};

		    	return;
		    }
		    console.log(datas.user);
		    $scope.users.push(datas.user);
		    $scope.nbUsers.length++;
		    $scope.newUserInputLogin = '';
			$scope.newUserInputEmail = '';
			$scope.newUserInputPassword = '';
		    $scope.lightboxAddUser= false;

		});



	};
	$scope.suppVerif=function() {
		console.log('here');
		console.log($scope.users);

		$scope.supprimerVerif=true;
		$timeout(function(){
		    $scope.supprimerVerif=false;
		    console.log('fin'); 
		    console.log($scope.supprimerVerif); 
		}, 5000);
	};
	$scope.supprimer=function() {
		$scope.supprimerVerif=false;
		userToRemove = filterFilter($scope.users,{selected : true});
		userIdToRemove = [];
		for(u in userToRemove){
		
			userIdToRemove.push(userToRemove[u]['id']);
		}
		//console.log(userIdToRemove); 
		$http.post('/user/removeUser',userIdToRemove).success(function(datas, status) {

			if(datas == 'success')
			{ 
				function inArray(array, p_val) {
				    var l = array.length;
				    for(var i = 0; i < l; i++) {
				        if(array[i] == p_val) {
				            return true;
				        }
				    }
				    return false;
				}
				
				for(u in $scope.users){

					

					if(inArray(userIdToRemove, $scope.users[u]['id'] ))
					{
						var index = $scope.users.indexOf($scope.users[u]);
						console.log('index = '+ index); 
						$scope.users.splice(index,1);
						// $scope.$apply();
					}
				}
				console.log($scope.users);

			}


		});

	};

}
function dashboardCtrl($scope){


	$scope.test = 'toto';


}
