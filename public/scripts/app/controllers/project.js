app.controller('projectCtrl',['$scope' ,'$rootScope','$route','$routeParams', 'filterFilter' , '$http','$timeout','$location','handleEditProject','$rootScope',
function projectCtrl($scope, $route ,$rootScope, $routeParams, filterFilter, $http, $timeout,$location, handleEditProject,$rootScope) {

	$scope.projects=[];
	$scope.$watch('projects',function  () {
		$scope.nbChecked = filterFilter($scope.projects,{selected : true}).length;
		$scope.allchecked = ($scope.nbChecked == $scope.projects.length);
		$scope.disableOptions = !$scope.nbChecked;
		$scope.nbProjects= $scope.projects.length;


	},true);
	$http.get('project/getAllProjects').success(function(datas) {
		
		if(typeof(datas) =='object')
		{
			$scope.projects = datas;
			$scope.chargementTerminer= true;
			if($routeParams.id && $scope.projects.length > 0)
			{
				$scope.proToEdit =  filterFilter($scope.projects,{id : $routeParams.id})[0]
				// $scope.initDropFile();
			}else{
			}
		}else
		{
			console.log('Vous navez pas les droits');
		}
		
	});
	$scope.chargementTerminer= false;
	$scope.disableOptions= false;
	$scope.lightboxAddProject= false;

	 $rootScope.$on('dropEvent',function(evt, dragged,dropped) {
		console.log('drop ! ! !'); 
	 	console.log(evt); 
	 	console.log(dragged); 
	 	console.log(dropped); 
	     
	 });
	
	
	$scope.checkAll=function(allchecked) {
		allchecked = !allchecked;
		$scope.projects.forEach(function(project) {
			project.selected = allchecked;
		});
	};
	$scope.closeLightBox=function() {
		
		$('.has-error').removeClass('has-error');
		$('.handleErrors').html('');
		$scope.newProjectInputName = '';
		$scope.newProjectInputDescription = '';
		
	};
	$scope.addProject=function() {

		console.log('addPpro');
		var project = {};
		project.name = this.newProjectInputName
		project.description = this.newProjectInputDescription
		
		console.log(project)
		

		$http.post('/project/add',project).success(function(datas, status) {
		    	

		    console.log('sauvegarder')
		    console.log(datas)
		    
		    if(!datas.success)
		    {
		    	console.log(datas.errors);
		    	
				$('.form-group[rel="'+datas.errors.input+'"]').addClass('has-error');
				$('.handleErrors').append('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'
				+ datas.errors.msg +
				'</div>')
		    	return;
		    }

		    $('.has-error').removeClass('has-error');
		    $('.handleErrors').html('');
		    console.log(datas.project);
		    $scope.projects.push(datas.project);
		    $scope.nbProjects.length++;
		    $scope.newProjectInputName = '';
			$scope.newProjectInputDescription = '';
			
		    $scope.lightboxAddProject= false;

		}).error(function(datas,status){console.log(datas)});
	};
	$scope.editProject=function() {


		console.log('editpro');
		var project = $scope.proToEdit;
		var args = {};
		console.log(project)
		args.project = project;

		$http.post('/project/editPost',args).success(function(datas, status) {
		 	$location.path('project');

		}).error(function(datas,status){
			console.log('errr')
			console.log(datas)


		});
	};
	$scope.suppVerif=function() {
		console.log('here');
		console.log($scope.projects);

		$scope.supprimerVerif=true;
		$timeout(function(){
		    $scope.supprimerVerif=false;
		    console.log('fin'); 
		    console.log($scope.supprimerVerif); 
		}, 5000);
	};
	$scope.supprimer=function() {
		$scope.supprimerVerif=false;
		projectToRemove = filterFilter($scope.projects,{selected : true});
		projectIdToRemove = [];
		for(u in projectToRemove){
		
			projectIdToRemove.push(projectToRemove[u]['id']);
		}
		console.log(projectIdToRemove); 
		$http.post('/project/removeProject',projectIdToRemove).success(function(datas, status) {
			var indexToremove=[];
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
				console.log(projectIdToRemove); 
				
				for(u in $scope.projects){

					console.log($scope.projects[u]); 

					if(inArray(projectIdToRemove, $scope.projects[u]['id'] ))
					{
						var index = $scope.projects.indexOf($scope.projects[u]);
						console.log('index = '+ index); 
						indexToremove.push(index);
						// $scope.projects.splice(index,1);
						// $scope.$apply();
					}
				}
				console.log($scope.projects);

			}


		});

	};
	$scope.editPage = function(id) {
		
	    if(!id)
			var projToEdit = filterFilter($scope.projects,{selected : true})[0];
		else
			var projToEdit = filterFilter($scope.projects,{id : id})[0];
		$scope.editProjectInputDescription = projToEdit.description;
		$scope.editProjectInputName = projToEdit.name;
		handleEditProject.save(projToEdit.name ,  projToEdit.description);
		$scope.test= 'true';
		$location.path('project/edit/'+projToEdit.id);
	}



}]);